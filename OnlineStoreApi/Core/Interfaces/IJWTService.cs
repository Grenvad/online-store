using OnlineStoreApi.Domain.Entitties.Identity;
using System.Threading.Tasks;

namespace OnlineStoreApi.Core.Interfaces
{
    public interface IJWTService
    {
        Task<TokenResponse> CreateJwtToken(StoreUser user);
        Task<TokenResponse> RefreshToken(string refreshToken);
    }
}
