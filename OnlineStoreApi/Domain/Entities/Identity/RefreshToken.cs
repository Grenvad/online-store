using OnlineStoreApi.Domain.Entitties.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entitties.Identity
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
        public DateTime AddedDate { get; set; }
        public DateTime ExpiryDate { get; set; }

        [ForeignKey(nameof(UserId))]
        public StoreUser User { get; set; }
    }
}
