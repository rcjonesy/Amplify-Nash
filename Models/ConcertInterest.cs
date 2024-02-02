namespace AmplifyNash.Models;

public class ConcertInterest
{
    public int Id { get; set; }
    public int? ConcertId { get; set; }
    public Concert? Concert { get; set; }
    public int? UserId { get; set; }
}