using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class BookDto
    {
        [Required] public string Title { get; set; } = null!;
        [Required] public string Author { get; set; } = null!;
        public string Description { get; set; } = null!;
    }
}
