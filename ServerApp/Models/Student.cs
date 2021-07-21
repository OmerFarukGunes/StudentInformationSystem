using System;
using Microsoft.AspNetCore.Identity;

namespace ServerApp.Models
{
    public class Student
    {

        public int StudentId { get; set; }
        public int LoginId { get; set; }
        public int PaymentId{get;set;}
        public int SchoolInfoId { get; set; }
        public string StudentName { get; set; }
        public string StudentSurname { get; set; }
        public string Address { get; set; }
        public long TC { get; set; }
        public string City { get; set; }
        public string Gender { get; set; }
        
    }

}