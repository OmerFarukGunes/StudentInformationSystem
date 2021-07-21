using System.ComponentModel.DataAnnotations;  
  
namespace ServerApp.Models
{
    public class email
    {
        public string to { get; set; }  
        public string subject { get; set; }  
        public string body { get; set; }  
    }
}