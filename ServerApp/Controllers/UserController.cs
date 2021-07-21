using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServerApp.Models;
using Newtonsoft.Json.Linq;
using System.Net.Mail;
using System.Net.Http;
using System.Net;

namespace ServerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public readonly IConfiguration _configuration;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var obj = await _userManager.FindByIdAsync(id.ToString());
            return Ok(obj);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(User model)
        {
            email _email=new email();
            var user = new User
            {
                Email = model.Email,
                Role = model.Role,
                UserName = model.UserName
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {   
                 _email.subject="hosgeldiniz";
                _email.to=model.Email;
                 _email.body="sifreniz"+model.Password;
                 SendEmail(_email);
                return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, GUser(user));
            }
            return BadRequest();
        }
        private static User GUser(User obj)
        {
            return new User()
            {
            Id = obj.Id,
            Email = obj.Email,
            Role = obj.Role,
                UserName = obj.UserName
        };
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(User model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest(new { message = "email is incorrect" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (result.Succeeded)
            {
                return Ok(new
                {
                    token = GenerateJwtToken(user)
                });
            }
            return Unauthorized();
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetSection("AppSettings:Secret").Value);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                    new Claim(ClaimTypes.Email,user.Email),
                    new Claim(ClaimTypes.Role,user.Role)
                }),
                Issuer = "fgmedya.com",
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public void SendEmail(email e)  
        {  
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential("kariyerportali.bmo@gmail.com","kariyerportali.2020"),
                EnableSsl = true
            };
            client.Send("kariyerportali.bmo@gmail.com", e.to, e.subject,e.body);
        } 
    }
     
}