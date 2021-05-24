using OnlineStoreApi.Domain.Entitties.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Services.UserService.Queries
{
    public class GetUserList
    {
        public record Query() : IRequest<IEnumerable<UserViewModel>>;

        public class Handler : IRequestHandler<Query, IEnumerable<UserViewModel>>
        {
            private readonly UserManager<StoreUser> _userManager;

            public Handler(UserManager<StoreUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<IEnumerable<UserViewModel>> Handle(Query request, CancellationToken cancellationToken)
            {
                return _userManager.Users.Select(i => new UserViewModel 
                { 
                    Id = i.Id,
                    UserName = i.UserName,
                    Email = i.Email
                }).ToList();
            }
        }
    }
}
