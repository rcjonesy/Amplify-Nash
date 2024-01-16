namespace AmplifyNash.Models.DTOs;

public class BandConcertDTO
{
    public int Id { get; set; }
    public int BandId { get; set; }
    public BandDTO Band { get; set; }
    public int ConcertId { get; set; }
    public BandConcertDTO Concert { get; set; }
}