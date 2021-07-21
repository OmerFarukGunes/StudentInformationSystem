namespace ServerApp.Models
{
    public class Payment
{
    public int PaymentId { get; set; }
    public long Loan { get; set; }
    public int Installment { get; set; }
    public long Discount { get; set; }
    public long Paid { get; set; }
    public int StartMonth { get;set;}
    public int StartYear { get;set;}
}

}