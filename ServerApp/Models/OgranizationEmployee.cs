using System;
namespace ServerApp.Models
{
    public class OrganizationEmployee
    {
        public int ID{get;set;}
        public int OrganizationId { get; set; }
        public string OrganizationName { get; set; }
        public string AppellationName { get; set; }
        public int Count { get; set; }
    }

}