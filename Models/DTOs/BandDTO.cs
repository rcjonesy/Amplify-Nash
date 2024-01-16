namespace AmplifyNash.Models.DTOs;

public class BandDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string Genre { get; set; }
    public bool IsHeadliner { get; set; }
    public List<BandMemberDTO> BandMembers { get; set; }
}
