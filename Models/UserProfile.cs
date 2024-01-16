using Microsoft.AspNetCore.Identity;

namespace AmplifyNash.Models;

public class UserProfile
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Email { get; set; }
    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }

   
}