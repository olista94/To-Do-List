using Microsoft.EntityFrameworkCore;
using TodoList.Models;

namespace TodoList.Database
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; } 
    }
}
