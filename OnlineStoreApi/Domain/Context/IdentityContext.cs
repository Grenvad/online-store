using Domain.Entitties.Identity;
using OnlineStoreApi.Domain.Entitties.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace OnlineStoreApi.Domain.Context
{
    public class IdentityContext : IdentityDbContext<StoreUser>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        {

        }

        public virtual DbSet<RefreshToken> RefreshTokens { get; set; }
    }
}


