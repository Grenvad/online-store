using OnlineStoreApi.Domain.Entitties.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.UserService.Queries
{
    public class GetUserData
    {
        public record Query(ClaimsPrincipal User) : IRequest<Response>;

        public record Response(bool Succeeded, string Message, UserViewModel User);

        public class Handler : IRequestHandler<Query, Response>
        {
            private readonly UserManager<StoreUser> _userManager;

            public Handler(UserManager<StoreUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var userEmail = request.User.FindFirst(ClaimTypes.Email).Value;
                var user = await _userManager.FindByEmailAsync(userEmail);
                var userViewModel = new UserViewModel
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Roles = await _userManager.GetRolesAsync(user).ConfigureAwait(false),
                };
                return user != null ?
                    new Response(true, $"Успшено", userViewModel) :
                    new Response(false, "Что-то пошло не так", null);
            }
        }
    }
}
