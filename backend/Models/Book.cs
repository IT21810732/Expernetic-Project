using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required] public string Title { get; set; }  = null!;
        [Required] public string Author { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
