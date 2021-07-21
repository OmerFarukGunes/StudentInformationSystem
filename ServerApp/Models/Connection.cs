namespace ServerApp.Models
{
    public class Connection
    {
        public int ConnectionId { get; set; }
        public int ParentId { get; set; }
        public int StudentId { get; set; }
        public int PaymentId { get; set; }
    }

}