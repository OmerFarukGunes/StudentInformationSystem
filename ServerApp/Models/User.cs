using System;
using Microsoft.AspNetCore.Identity;

namespace ServerApp.Models
{
    public class User : IdentityUser<int>
    {       
        public string Role{get;set;}
         public string Password { get; set; }
    }
}
