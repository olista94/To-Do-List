using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Database;
using TodoList.Models;

namespace TodoList.Controllers
{
    /// <summary>
    /// Controlador para gestionar las tareas de la aplicación.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TodoContext _context;

        /// <summary>
        /// Constructor del controlador de tareas.
        /// </summary>
        /// <param name="context">Contexto de base de datos.</param>
        public TasksController(TodoContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Obtiene la lista de todas las tareas.
        /// </summary>
        /// <returns>Una lista de tareas.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        /// <summary>
        /// Obtiene una tarea específica por su ID.
        /// </summary>
        /// <param name="id">El ID de la tarea.</param>
        /// <returns>La tarea correspondiente al ID proporcionado.</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
                return NotFound();

            return task;
        }

        /// <summary>
        /// Crea una nueva tarea.
        /// </summary>
        /// <param name="taskItem">Los datos de la tarea a crear.</param>
        /// <returns>La tarea creada.</returns>
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem taskItem)
        {
            if (string.IsNullOrWhiteSpace(taskItem.Title) || taskItem.Description.Length < 10)
                return BadRequest("Invalid task data.");

            _context.Tasks.Add(taskItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = taskItem.Id }, taskItem);
        }

        /// <summary>
        /// Actualiza una tarea existente.
        /// </summary>
        /// <param name="id">El ID de la tarea a actualizar.</param>
        /// <param name="taskItem">Los nuevos datos de la tarea.</param>
        /// <returns>Un resultado HTTP.</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                return BadRequest("El ID de la tarea no coincide con el ID de la solicitud.");
            }

            var existingTask = await _context.Tasks.FindAsync(id);
            if (existingTask == null)
            {
                return NotFound($"No se encontró la tarea con ID {id}.");
            }

            if (string.IsNullOrWhiteSpace(taskItem.Title))
            {
                return BadRequest("El título no puede estar vacío.");
            }

            if (string.IsNullOrWhiteSpace(taskItem.Description) || taskItem.Description.Length < 10)
            {
                return BadRequest("La descripción debe tener al menos 10 caracteres.");
            }

            try
            {
                existingTask.Title = taskItem.Title;
                existingTask.Description = taskItem.Description;
                existingTask.IsCompleted = taskItem.IsCompleted;

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }

            return NoContent();
        }

        /// <summary>
        /// Elimina una tarea existente.
        /// </summary>
        /// <param name="id">El ID de la tarea a eliminar.</param>
        /// <returns>Un resultado HTTP.</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
