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
    public class StudentController : ControllerBase
    {
        private readonly SystemContext _context;

        public StudentController(SystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents()
        {
            var obj = await _context.Students.
            ToListAsync();
            return Ok(obj);
        } 
        [HttpGet("/api/Student/ByConnections/{id}")]
        public async Task<IActionResult> GetStudentsByConnections(List<int> id)
        { 
            List<Student> users = new List<Student>();
            foreach (var item in id)
            {
                users.Add(await _context.Students.Where(i =>i.StudentId ==item).FirstOrDefaultAsync());
            }
           
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {   
            var obj = await _context.Students.FirstOrDefaultAsync(i => i.StudentId == id);
            return Ok(obj);
        }
        [HttpPost("filterStudent")]
        public async Task<IActionResult> GetStudent([FromBody]Student info)
        {
            List<Student> obj = await _context.Students.Where(x=>x.StudentName==info.StudentName||x.TC==info.TC||x.StudentSurname==info.StudentSurname).ToListAsync();
            return Ok(obj);
        }

     
      

         [HttpGet("ByLoginId/{id}")]
        public async Task<IActionResult> GetStudentByLoginId(int id)
        {
            var obj = await _context.Students.FirstOrDefaultAsync(i => i.LoginId == id);
            return Ok(obj);
        }
        [HttpPost]
        public async Task<IActionResult> createStudent(Student obj)
        {
            _context.Students.Add(obj);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetStudent), new { id = obj.StudentId }, Student(obj));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> updateStudent(int id, Student obj)
        {
            if (id != obj.StudentId)
                return BadRequest();
            var model = await _context.Students.FindAsync(id);
            if (model == null)
                return NotFound();
            model.PaymentId = obj.PaymentId;
            model.SchoolInfoId = obj.SchoolInfoId;
            model.StudentName = obj.StudentName;
            model.StudentSurname = obj.StudentSurname;
            model.Address = obj.Address;
            model.TC = obj.TC;
            model.City = obj.City;
            model.Gender = obj.Gender;
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
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var obj = await _context.Students.FindAsync(id);
            if (obj == null)
                return NotFound();

            _context.Students.Remove(obj);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private static Student Student(Student p)
        {
            return new Student()
            {
            StudentId =p.StudentId,
            LoginId = p.LoginId,
            PaymentId = p.PaymentId,
            SchoolInfoId = p.SchoolInfoId,
            StudentName = p.StudentName,
            StudentSurname = p.StudentSurname,
            Address = p.Address,
            TC = p.TC,
            City = p.City,
            Gender = p.Gender,
        };
        }
    }
}