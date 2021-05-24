using MediatR;
using Microsoft.AspNetCore.Identity;
using OnlineStoreApi.Domain.Entitties.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.UserService.Commands
{
    public class DeleteUser
    {
        public record Command(string Id) : IRequest<Response>;

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
                var user = await _userManager.FindByIdAsync(request.Id);
                var result = await _userManager.DeleteAsync(user);
                return result.Succeeded ? new Response(true, "Пользователь успешно удалён")
                                        : new Response(false, "Что-то пошло не так");
            }
        }
    }
}
