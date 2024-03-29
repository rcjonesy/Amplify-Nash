namespace AmplifyNash.Models.DTOs;

public class BandDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
    public string Genre { get; set; }
    public bool IsHeadliner { get; set; }
    public string? Img { get; set; }
    public List<BandMemberDTO> BandMembers { get; set; }
    public List<BandConcertDTO>? BandConcerts { get; set; }
    public int? UserProfileId { get; set; }
    public UserProfileDTO? UserProfile { get; set; }
}
