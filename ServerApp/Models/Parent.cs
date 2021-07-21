namespace ServerApp.Models
{
    public class Parent
    {
        public int ParentId { get; set; }
        public int LoginId { get; set; }
        public string MotherName { get; set; }
        public string FatherName { get; set; }
        public long MotherTC { get; set; }
        public long FatherTC { get; set; }
        public long MotherNumber { get; set; }
        public long FatherNumber { get; set; }
    }

}