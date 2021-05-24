using OnlineStoreApi.Core.Interfaces;
using OnlineStoreApi.Domain.Entitties.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.UserService.Queries
{
    public static class GetUserToken
    {
        public record Query(string Email, string Password) : IRequest<Response>;

        public record Response(bool Succeeded, string Message, UserViewModel User, string AccessToken, string RefreshToken);

        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly UserManager<StoreUser> _userManager;
            private readonly IJWTService _jwtService;

            public Handler(UserManager<StoreUser> userManager, IJWTService jwtService)
            {
                _userManager = userManager;
                _jwtService = jwtService;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                {
                    return new Response(false, "Такого пользователя не существует", null, null, null);
                }
                if (await _userManager.CheckPasswordAsync(user, request.Password))
                {
                    var tokens = await _jwtService.CreateJwtToken(user);
                    var userViewModel = new UserViewModel
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        Email = user.Email,
                        Roles = await _userManager.GetRolesAsync(user).ConfigureAwait(false),
                    };
                    return new Response(true, "успешно", userViewModel, tokens.AccessToken, tokens.RefreshToken);
                }
                return new Response(false, "Неверный пароль", null, null, null);
            }
        }
    }
}
