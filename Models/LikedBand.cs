namespace AmplifyNash.Models;

public class LikedBand
{
    public int Id { get; set; }
    public int? BandId { get; set; }
    public Band? Band { get; set; }
    public int? UserId { get; set; }
}