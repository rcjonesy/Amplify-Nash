using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using AmplifyNash.Models;
using Microsoft.AspNetCore.Identity;

namespace AmplifyNash.Data;
//IdentityDbContext<TUser> is a class provided by ASP.NET Core Identity, which extends the functionalities of DbContext
public class AmplifyNashDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
  
    public DbSet<UserProfile> UserProfiles { get; set; }

    public AmplifyNashDbContext(DbContextOptions<AmplifyNashDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }
//The Ids for the Identity Framework tables are Guids, not ints. A Guid (Global Unique Identifier) can be generated with Guid.NewGuid(). 
// You will need to do this when you create your own data to seed.
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

//IdentityRole - this will hold the various roles that a use can have
        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });
//IdentityUser - this will hold login credentials for users
        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });
//IdentityUserRole - a many-to-many table between roles and users. These define which users have which roles.
        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

     
      
       
    }
}