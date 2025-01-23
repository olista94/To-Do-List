using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using TodoList.Database;
using TodoList.Models;

namespace TodoList.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly TodoContext _context;

        public AuthController(TodoContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User loginData)
        {
            var user = _context.Users.FirstOrDefault(u => 
                u.Username == loginData.Username && u.Password == loginData.Password);
                
            if (user == null)
                return Unauthorized("Usuario o contraseña incorrectos.");

            return Ok(new { message = "Login exitoso", username = user.Username });
        }
    }
}
