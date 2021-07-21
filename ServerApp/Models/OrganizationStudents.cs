using System;
namespace ServerApp.Models
{
    public class OrganizationStudent
    {
        public int ID{get;set;}
        public int OrganizationId { get; set; }
        public string AcademicYearName { get; set; }
        public int Count { get; set; }
    }

}