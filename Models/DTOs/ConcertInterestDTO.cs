namespace AmplifyNash.Models.DTOs;

public class ConcertInterestDTO
{
    public int Id { get; set; }
    public int? ConcertId { get; set; }
    public ConcertDTO? Concert { get; set; }
    public int? UserId { get; set; }
}