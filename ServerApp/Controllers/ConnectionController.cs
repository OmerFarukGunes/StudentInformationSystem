using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using ServerApp.Data;
using System.Linq;
namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConnectionController : ControllerBase
    {
        private readonly SystemContext _context;

        public ConnectionController(SystemContext context)
        {
            _context = context;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConnectionById(int id)
        {
            var obj = await _context.Connections.FirstOrDefaultAsync(i => i.ConnectionId == id);
            return Ok(obj);
        }
        [HttpGet("/api/Connection/ByFamilyId/{id}")]
        public async Task<IActionResult> GetConnectionByFamilyId(int id)
        {
            var obj = await _context.Connections.Where(i => i.ParentId == id).ToListAsync();
            return Ok(obj);
        }
        [HttpGet("/api/Connection/ByStudentId/{id}")]
        public async Task<IActionResult> GetConnectionByStudentId(int id)
        {
            var obj = await _context.Connections.FirstOrDefaultAsync(i => i.StudentId == id);
            return Ok(obj);
        }
        [HttpPost]
        public async Task<IActionResult> createConnection(Connection obj)
        {
            _context.Connections.Add(obj);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetConnectionById), new { id = obj.ConnectionId }, Connection(obj));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> updateConnection(int id, Connection obj)
        {
            if (id != obj.ConnectionId)
                return BadRequest();
            var model = await _context.Connections.FindAsync(id);
            if (model == null)
                return NotFound();
            model.PaymentId = obj.PaymentId;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (System.Exception)
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConnection(int id)
        {
            var obj = await _context.Connections.FindAsync(id);
            if (obj == null)
                return NotFound();

            _context.Connections.Remove(obj);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private static Connection Connection(Connection obj)
        {
            return new Connection()
            {
            ParentId = obj.ParentId,
            StudentId = obj.StudentId,
            PaymentId = obj.PaymentId
        };
    }
}
}