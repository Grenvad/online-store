using System.ComponentModel.DataAnnotations;

namespace OnlineStoreApi.Entitties.Identity
{
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
