using System.ComponentModel.DataAnnotations;

namespace OnlineStoreApi.Domain.Entitties.Identity
{
    public class TokenResponse
    {
        [Required]
        public string AccessToken { get; set; }
        [Required]
        public string RefreshToken { get; set; }
    }
}
