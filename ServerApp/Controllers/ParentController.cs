using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using ServerApp.Data;
using System.Collections.Generic;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParentController : ControllerBase
    {
        private readonly SystemContext _context;

        public ParentController(SystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetParents()
        {
            var obj = await _context.Parents.
            ToListAsync();
            return Ok(obj);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetParent(int id)
        {
            var obj = await _context.Parents.FirstOrDefaultAsync(i => i.ParentId == id);
            return Ok(obj);
        }
        [HttpGet("ByLoginId/{id}")]
        public async Task<IActionResult> GetParentByLoginId(int id)
        {
            var obj = await _context.Parents.FirstOrDefaultAsync(i => i.LoginId == id);
            return Ok(obj);
        }
           [HttpPost("filterParent")]
        public async Task<IActionResult> GetParent([FromBody]Parent user)
        {
            List<Parent> obj = await _context.Parents.Where(x=>x.FatherName==user.FatherName||x.FatherNumber==user.FatherNumber||x.FatherTC==user.FatherTC||x.MotherName==user.MotherName||x.MotherTC==user.MotherTC||x.MotherNumber==user.MotherNumber).ToListAsync();
            return Ok(obj);
        }
        [HttpPost]
        public async Task<IActionResult> createParent(Parent obj)
        {
            _context.Parents.Add(obj);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetParent), new { id = obj.ParentId }, Parent(obj));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> updateParent(int id, Parent obj)
        {
            if (id != obj.ParentId)
                return BadRequest();
            var model = await _context.Parents.FindAsync(id);
            if (model == null)
                return NotFound();
            model.MotherName = obj.MotherName;
            model.FatherName = obj.FatherName;
            model.MotherTC = obj.MotherTC;
            model.FatherTC = obj.FatherTC;
            model.MotherNumber = obj.MotherNumber;
            model.FatherNumber = obj.FatherNumber;
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
        public async Task<IActionResult> DeleteParent(int id)
        {
            var obj = await _context.Parents.FindAsync(id);
            if (obj == null)
                return NotFound();

            _context.Parents.Remove(obj);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private static Parent Parent(Parent obj)
        {
            return new Parent()
            {
                ParentId = obj.ParentId,
            MotherName = obj.MotherName,
            FatherName = obj.FatherName,
            MotherTC = obj.MotherTC,
            FatherTC = obj.FatherTC,
            MotherNumber = obj.MotherNumber,
            FatherNumber = obj.FatherNumber
        };
    }
}
}