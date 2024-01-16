namespace AmplifyNash.Models.DTOs;

public class BandMemberDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Instrument { get; set; }
    public int BandId { get; set; }
    public BandDTO Band { get; set; }
}