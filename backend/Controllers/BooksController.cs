using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;
        public BooksController(LibraryContext context) => _context = context;

        //Retrieve all books
        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _context.Books.ToListAsync());

        //Retreieve specific a book by it's id
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var book = await _context.Books.FindAsync(id);
            return book == null ? NotFound() : Ok(book);
        }
        
        //Create a new book by only authorized users
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(BookDto dto)
        {
            var book = new Book
            {
                Title = dto.Title,
                Author = dto.Author,
                Description = dto.Description
            };
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return Ok(book);
        }

        //Update an existing specific book by only authorized users
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, BookDto dto)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound();

            book.Title = dto.Title;
            book.Author = dto.Author;
            book.Description = dto.Description;

            await _context.SaveChangesAsync();
            return Ok(book);
        }

        //Delete an existing specific book by only authorize users
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound();

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Deleted successfully" });
        }
    }
}
