using System;
namespace ServerApp.Models
{
    public class SchoolInfo
    {

        public int SchoolInfoId { get; set; }
        public string SchoolName { get; set; }
        public int Class { get; set; }
        public int DateOfRegistration { get; set; }
        public long SchoolNumber { get; set; }
        public string Branch { get; set; }
    }

}