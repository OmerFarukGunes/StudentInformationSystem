using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Models;
using ServerApp.Data;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly SystemContext _context;

        public PaymentController(SystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPayments()
        {
            var obj = await _context.Payments.
            ToListAsync();
            return Ok(obj);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPayment(int id)
        {
            var obj = await _context.Payments.FirstOrDefaultAsync(i => i.PaymentId == id);
            return Ok(obj);
        }
        [HttpPost]
        public async Task<IActionResult> createPayment(Payment obj)
        {
            _context.Payments.Add(obj);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPayment), new { id = obj.PaymentId }, Payment(obj));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> updatePayment(int id, Payment obj)
        {
            if (id != obj.PaymentId)
                return BadRequest();
            var model = await _context.Payments.FindAsync(id);
            if (model == null)
                return NotFound();
            model.Loan = obj.Loan;
            model.Installment = obj.Installment;
            model.Discount = obj.Discount;
            model.Paid = obj.Paid;
            model.StartMonth = obj.StartMonth;
            model.StartYear = obj.StartYear;
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
        public async Task<IActionResult> DeletePayment(int id)
        {
            var obj = await _context.Payments.FindAsync(id);
            if (obj == null)
                return NotFound();

            _context.Payments.Remove(obj);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private static Payment Payment(Payment obj)
        {
            return new Payment()
            {
                PaymentId = obj.PaymentId,
            Loan = obj.Loan,
            Installment = obj.Installment,
            Discount = obj.Discount,
            Paid = obj.Paid,
            StartMonth = obj.StartMonth,
            StartYear = obj.StartYear
        };
    }
}
}