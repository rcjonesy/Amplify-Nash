namespace AmplifyNash.Models;

public class Band
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string Genre { get; set; }
    public bool IsHeadliner { get; set; }
    public List<BandMember> BandMembers { get; set; }
}
