using Domain.Entitties.Identity;
using OnlineStoreApi.Core.Interfaces;
using OnlineStoreApi.Domain.Context;
using OnlineStoreApi.Domain.Entitties.Identity;
using OnlineStoreApi.Domain.Entitties.Identity.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.JwtService
{
    public class JWTService : IJWTService
    {
        private readonly JWT _jwt;
        private readonly IdentityContext _identityContext;
        private readonly UserManager<StoreUser> _userManager;

        public JWTService(IOptions<JWT> jwt, UserManager<StoreUser> userManager,
            IdentityContext identityContext)
        {
            _jwt = jwt.Value;
            _identityContext = identityContext;
            _userManager = userManager;
        }

        public async Task<TokenResponse> CreateJwtToken(StoreUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();
            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim("roles", roles[i]));
            }
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials);

            var refreshToken = await GenerateRefreshToken(user);

            return new TokenResponse
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                RefreshToken = refreshToken.Token
            };
        }

        private async Task<RefreshToken> GenerateRefreshToken(StoreUser user)
        {
            var refreshToken = new RefreshToken
            {
                UserId = user.Id,
                AddedDate = DateTime.UtcNow,
                ExpiryDate = DateTime.UtcNow.AddMonths(6),
                Token = Guid.NewGuid().ToString() + '-' + Guid.NewGuid().ToString()
            };

            await _identityContext.RefreshTokens.AddAsync(refreshToken);
            await _identityContext.SaveChangesAsync();
            return refreshToken;
        }


        public async Task<TokenResponse> RefreshToken(string refreshToken)
        {
            var tokenData = await _identityContext.RefreshTokens.Include(u => u.User).FirstOrDefaultAsync(i => i.Token == refreshToken);
            if (tokenData == null)
            {
                return null;
            }

            if (DateTime.Now > tokenData.ExpiryDate)
            {
                return null;
            }

            var newTokens = await CreateJwtToken(tokenData.User);

            _identityContext.RefreshTokens.Remove(tokenData);
            await _identityContext.SaveChangesAsync();
            return newTokens;
        }
    }
}
