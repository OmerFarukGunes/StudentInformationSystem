using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using ServerApp.Data;
using System.Linq;
using System.Collections.Generic;
using System.Data.SqlClient;
namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrganizationsController : ControllerBase
    {
        private readonly SystemContext _context;

        public OrganizationsController(SystemContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetOrganizationEmployees()
        {
            var obj = await _context.OrganizationEmployees.ToListAsync();
            return Ok(obj);
        } 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrganizationStudents(int id)
        {     
           var obj = await _context.OrganizationStudents.FromSqlRaw(@"SELECT * FROM OrganizationStudents WHERE OrganizationId= "+ id).ToListAsync();
           
            return Ok(obj);
        } 
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrganizationEmployees(int id)
        {
            var obj = await _context.OrganizationEmployees.FindAsync(id);
            if (obj == null)
                return NotFound();

            _context.OrganizationEmployees.Remove(obj);
            await _context.SaveChangesAsync();
            return NoContent();
        }
         [HttpPost("filterOrganizationEmployee")]
        public async Task<IActionResult> GetOrganization([FromBody]OrganizationEmployee model)
        {   
            List<OrganizationEmployee> obj=new List<OrganizationEmployee>();
            string[] OrganizationName = model.OrganizationName.Split(',');
            string[] AppellationName = model.AppellationName.Split(',');

            if(model.ID==1){
                foreach (var item in OrganizationName)
                {
                 obj.AddRange(await _context.OrganizationEmployees.Where(x=>x.OrganizationName==item).ToListAsync());
                }    
            }
            else if(model.ID==2){
                  foreach (var item in AppellationName)
                {
                 obj.AddRange(await _context.OrganizationEmployees.Where(x=>x.AppellationName==item).ToListAsync());
                }   
            }
            else{
                  foreach (var itm in OrganizationName)
                {
                        foreach (var item in AppellationName)
                {
                          obj.AddRange(await _context.OrganizationEmployees.Where(x=>x.AppellationName==item &&x.OrganizationName==itm).ToListAsync());
                }   
             
                }  
            }
           
           return Ok(obj);
        }
         
     
    
}
}