namespace AmplifyNash.Models.DTOs;

public class LikedBandDTO
{
    public int Id { get; set; }
    public int? BandId { get; set; }
    public BandDTO? Band { get; set; }
    public int? UserId { get; set; }
}