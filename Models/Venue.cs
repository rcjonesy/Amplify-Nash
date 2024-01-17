namespace AmplifyNash.Models;

public class Venue
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string PhoneNumber { get; set; }
    public int Capacity { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }
}