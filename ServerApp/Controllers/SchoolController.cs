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
    public class SchoolInfoController : ControllerBase
    {
        private readonly SystemContext _context;

        public SchoolInfoController(SystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetSchoolInfos()
        {
            var obj = await _context.SchoolInfos.
            ToListAsync();
            return Ok(obj);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSchoolInfo(int id)
        {
            var obj = await _context.SchoolInfos.FirstOrDefaultAsync(i => i.SchoolInfoId == id);
            return Ok(obj);
        }
        [HttpPost("filterSchool")]
        public async Task<IActionResult> GetSchool([FromBody]SchoolInfo user)
        {
            List<SchoolInfo> obj = await _context.SchoolInfos.Where(x=>x.Class==user.Class||x.SchoolName==user.SchoolName||x.SchoolNumber==user.SchoolNumber).ToListAsync();
            List<Student> models = new List<Student>();
            foreach (var item in obj)
            {
             models.Add(await _context.Students.Where(x=>x.SchoolInfoId==item.SchoolInfoId).FirstAsync());
            }
            return Ok(models);
        }
        [HttpPost]
        public async Task<IActionResult> createSchoolInfo(SchoolInfo obj)
        {
            _context.SchoolInfos.Add(obj);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSchoolInfo), new { id = obj.SchoolInfoId }, SchoolInfo(obj));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> updateSchoolInfo(int id, SchoolInfo obj)
        {
            if (id != obj.SchoolInfoId)
                return BadRequest();
            var model = await _context.SchoolInfos.FindAsync(id);
            if (model == null)
                return NotFound();
            model.SchoolName = obj.SchoolName;
            model.Class = obj.Class;
            model.DateOfRegistration = obj.DateOfRegistration;
            model.SchoolNumber = obj.SchoolNumber;
            model.Branch = obj.Branch;
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
        public async Task<IActionResult> DeleteSchoolInfo(int id)
        {
            var obj = await _context.SchoolInfos.FindAsync(id);
            if (obj == null)
                return NotFound();

            _context.SchoolInfos.Remove(obj);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private static SchoolInfo SchoolInfo(SchoolInfo obj)
        {
            return new SchoolInfo()
            {
            SchoolInfoId =obj.SchoolInfoId,
            SchoolName = obj.SchoolName,
            Class = obj.Class,
            DateOfRegistration = obj.DateOfRegistration,
            SchoolNumber = obj.SchoolNumber,
            Branch = obj.Branch,
        };
    }
}
}