namespace AmplifyNash.Models;

public class BandMember 
{
    public int Id  { get; set; }
    public string Name { get; set; }
    public string Instrument { get; set; }
    public int BandId { get; set; }
}