using Domain.Entitties.Identity;
using OnlineStoreApi.Domain.Constants;
using OnlineStoreApi.Domain.Entitties.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.UserService.Commands
{
    public static class RegisterUser
    {
        public record Command(UserRegisterModel User) : IRequest<Response>;

        public record Response(bool Succeeded, string Message);

        public class Handler : IRequestHandler<Command, Response>
        {
            private readonly UserManager<StoreUser> _userManager;

            public Handler(UserManager<StoreUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<Response> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = new StoreUser
                {
                    Email = request.User.Email,
                    UserName = request.User.UserName,
                };
                var result = await _userManager.CreateAsync(user, request.User.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, Authorization.default_role.ToString());
                    return new Response(true, $"Пользователь зарегистрирован");
                }
                return new Response(true, $"{result.Errors.First().Description}");
            }
        }
    }
}
