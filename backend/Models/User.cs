using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    { 
        public int Id { get; set; } 
        [Required] public string Email { get; set; } = null!;
        [Required] public string PasswordHash { get; set; } = null!;
        public string FullName { get; set; } = null!;
    }
}
