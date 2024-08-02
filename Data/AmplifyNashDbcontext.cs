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
    public DbSet<Venue> Venues { get; set; }
    public DbSet<Concert> Concerts { get; set; }
    public DbSet<Band> Bands { get; set; }
    public DbSet<BandConcert> BandConcerts { get; set; }
    public DbSet<BandMember> BandMembers { get; set; }
    public DbSet<LikedBand> LikedBands { get; set; }
    public DbSet<ConcertInterest> ConcertInterests { get; set; }

    //constructor, takes 2 parameters, configures the DBcontext options (connection string etc...)
    //encapsulation because it can only be accessed in the method itself
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

        modelBuilder.Entity<Venue>().HasData(new Venue[]
        {
            new Venue {Id = 1, Name = "Basement East", Address = "917 Woodland St, Nashville, TN 37206", PhoneNumber = "(615) 645-9174", Capacity = 150, UserProfileId = 1},
            new Venue {Id = 2, Name = "3rd and Lindsley", Address = "818 3rd Ave S, Nashville, TN 37210", PhoneNumber = "(615) 259-9891", Capacity = 700, UserProfileId = 1},
            new Venue {Id = 3, Name = "The High Watt", Address = "1 Cannery Row, Nashville, TN 37203", PhoneNumber = "(615) 251-3020", Capacity = 225, UserProfileId = 1},
            new Venue {Id = 4, Name = "The Basement", Address = "1604 8th Ave S, Nashville, TN 37203", PhoneNumber = "(615) 254-8006", Capacity = 300, UserProfileId = 1},
            new Venue {Id = 5, Name = "Exit/In", Address = "2208 Elliston Pl, Nashville, TN 37203", PhoneNumber = "(615) 321-3340", Capacity = 125, UserProfileId = 1},
            new Venue {Id = 6, Name = "The East Room", Address = "2412 Gallatin Ave, Nashville, TN 37206", PhoneNumber = "(615) 335-3137", Capacity = 100, UserProfileId = 1},
            new Venue {Id = 7, Name = "The Cobra Nashville", Address = "2511 Gallatin Ave, Nashville, TN 37206", PhoneNumber = "(615) 226-4875", Capacity = 350, UserProfileId = 1},
            new Venue {Id = 8, Name = "The End", Address = "2219 Elliston Pl, Nashville, TN 37203", PhoneNumber = "(615) 321-4457", Capacity = 275, UserProfileId = 1},
            new Venue {Id = 9, Name = "The Station Inn", Address = "402 12th Ave S, Nashville, TN 37203", PhoneNumber = "(615) 255-3307", Capacity = 145, UserProfileId = 1},
            new Venue {Id = 10, Name = "Mercy Lounge", Address = "1 Cannery Row, Nashville, TN 37203", PhoneNumber = "(615) 251-3020", Capacity = 210, UserProfileId = 1}
        });
        modelBuilder.Entity<Band>().HasData(new Band[]
        {
            new Band { Id = 1, Name = "Lunar Essence", Bio = "From the vibrant city of Austin, Texas, formed in 2010. Indie rock enchantment at its finest.", Genre = "Indie Rock", Img = "./Lunar.png", IsHeadliner = true, UserProfileId = 1},
            new Band { Id = 2, Name = "Sonic Catalyst", Bio = "Hailing from the eclectic city of Seattle, Washington, formed in 2013. Alternative rock pushing the boundaries.", Genre = "Rock", Img = "./Sonic.png", IsHeadliner = true, UserProfileId = 1},
            new Band { Id = 3, Name = "Aurora Melodies", Bio = "Emerging from the creative hub of Los Angeles, California, formed in 2012. Indie pop melodies that resonate with the soul.", Genre = "Indie Pop", Img = "./Aurora.png",  IsHeadliner = true, UserProfileId = 1},
            new Band { Id = 4, Name = "Rebel Resonance", Bio = "Born in the lively city of Nashville, Tennessee, formed in 2008. Rock anthems with a revolutionary spirit.", Genre = "Rock", Img = "./Rebel.png", IsHeadliner = true, UserProfileId = 1},
            new Band { Id = 5, Name = "Whispering Echoes", Bio = "From the serene city of Portland, Oregon, formed in 2015. Dreamy indie rock under the starry sky.", Genre = "Indie Rock", Img = "./Whispering.png", IsHeadliner = true, UserProfileId = 1},
            new Band { Id = 6, Name = "Electric Hues", Bio = "Infusing colors into soundwaves, based in San Francisco, California, formed in 2014. Indie electro-pop exploration.", Genre = "Indie Electro-Pop", Img = "./Hues.png", IsHeadliner = false, UserProfileId = 1},
            new Band { Id = 7, Name = "Urban Groove Collective", Bio = "Building grooves in the heart of New York City, formed in 2011. Fusion of funk, soul, and jazz.", Genre = "Funk/Soul/Jazz Fusion", Img = "./Urban.png", IsHeadliner = false, UserProfileId = 1},
            new Band { Id = 8, Name = "Neon Skylines", Bio = "Painting the musical canvas from Chicago, Illinois, formed in 2016. Synth-driven alt-rock landscapes.", Genre = "Alternative Rock", Img = "./Neon.png", IsHeadliner = false, UserProfileId = 1},
            new Band { Id = 9, Name = "Crimson Harmony", Bio = "Harmonizing in the misty streets of New Orleans, Louisiana, formed in 2017. Soulful indie melodies with a touch of jazz.", Genre = "Indie/Soul/Jazz Fusion", Img = "./Crimson.png", IsHeadliner = false, UserProfileId = 1},
            new Band { Id = 10, Name = "Mystic Soundwaves", Bio = "Channeling mystic vibes from Santa Fe, New Mexico, formed in 2019. Psychedelic rock explorations.", Genre = "Psychedelic Rock", Img = "./Mystic.png", IsHeadliner = false, UserProfileId = 1},
      });

        modelBuilder.Entity<BandMember>().HasData(new BandMember[]
        {
            new BandMember { Id = 1, Name = "Adam Turner", Instrument = "Lead Guitar", BandId = 1 },
            new BandMember { Id = 2, Name = "Emma Harris", Instrument = "Vocals", BandId = 1 },
            new BandMember { Id = 3, Name = "Ryan Thompson", Instrument = "Bass", BandId = 1 },
            new BandMember { Id = 4, Name = "Mia Jackson", Instrument = "Drums", BandId = 1 },

            new BandMember { Id = 5, Name = "Jordan Wilson", Instrument = "Bass", BandId = 2 },
            new BandMember { Id = 6, Name = "Ava Robinson", Instrument = "Guitar", BandId = 2 },
            new BandMember { Id = 7, Name = "Ethan Turner", Instrument = "Vocals", BandId = 2 },
            new BandMember { Id = 8, Name = "Sophia Evans", Instrument = "Drums", BandId = 2 },

            new BandMember { Id = 9, Name = "Nathan Scott", Instrument = "Drums", BandId = 3 },
            new BandMember { Id = 10, Name = "Olivia Reed", Instrument = "Guitar", BandId = 3 },
            new BandMember { Id = 11, Name = "Aiden Murphy", Instrument = "Vocals", BandId = 3 },
            new BandMember { Id = 12, Name = "Zoe Turner", Instrument = "Bass", BandId = 3 },

            new BandMember { Id = 13, Name = "Elijah Miller", Instrument = "Bass", BandId = 4 },
            new BandMember { Id = 14, Name = "Chloe Davis", Instrument = "Vocals", BandId = 4 },
            new BandMember { Id = 15, Name = "Isaac Parker", Instrument = "Drums", BandId = 4 },
            new BandMember { Id = 16, Name = "Lily Brooks", Instrument = "Guitar", BandId = 4 },

            new BandMember { Id = 17, Name = "Owen Harris", Instrument = "Vocals", BandId = 5 },
            new BandMember { Id = 18, Name = "Grace Turner", Instrument = "Guitar", BandId = 5 },
            new BandMember { Id = 19, Name = "Lucas Foster", Instrument = "Bass", BandId = 5 },
            new BandMember { Id = 20, Name = "Ella Reed", Instrument = "Drums", BandId = 5 },

            // Band 6
            new BandMember { Id = 21, Name = "Liam Anderson", Instrument = "Guitar", BandId = 6 },
            new BandMember { Id = 22, Name = "Ava Martinez", Instrument = "Vocals", BandId = 6 },
            new BandMember { Id = 23, Name = "Noah White", Instrument = "Bass", BandId = 6 },
            new BandMember { Id = 24, Name = "Harper Thompson", Instrument = "Drums", BandId = 6 },

            // Band 7
            new BandMember { Id = 25, Name = "Mason Turner", Instrument = "Drums", BandId = 7 },
            new BandMember { Id = 26, Name = "Lily Harris", Instrument = "Guitar", BandId = 7 },
            new BandMember { Id = 27, Name = "Elijah Robinson", Instrument = "Vocals", BandId = 7 },
            new BandMember { Id = 28, Name = "Zoey Miller", Instrument = "Bass", BandId = 7 },

            // Band 8
            new BandMember { Id = 29, Name = "Logan Scott", Instrument = "Bass", BandId = 8 },
            new BandMember { Id = 30, Name = "Mia Foster", Instrument = "Guitar", BandId = 8 },
            new BandMember { Id = 31, Name = "Carter Reed", Instrument = "Vocals", BandId = 8 },
            new BandMember { Id = 32, Name = "Emma Davis", Instrument = "Drums", BandId = 8 },

            // Band 9
            new BandMember { Id = 33, Name = "Wyatt Parker", Instrument = "Drums", BandId = 9 },
            new BandMember { Id = 34, Name = "Ava Turner", Instrument = "Guitar", BandId = 9 },
            new BandMember { Id = 35, Name = "Owen Murphy", Instrument = "Vocals", BandId = 9 },
            new BandMember { Id = 36, Name = "Isabella Brooks", Instrument = "Bass", BandId = 9 },

            // Band 10
            new BandMember { Id = 37, Name = "Jackson Harris", Instrument = "Vocals", BandId = 10 },
            new BandMember { Id = 38, Name = "Scarlett Turner", Instrument = "Guitar", BandId = 10 },
            new BandMember { Id = 39, Name = "Ethan Foster", Instrument = "Bass", BandId = 10 },
            new BandMember { Id = 40, Name = "Sofia Reed", Instrument = "Drums", BandId = 10 }

            
        });

        modelBuilder.Entity<Concert>().HasData(new Concert[]
        {
            new Concert { Id = 1, VenueId = 1, Time = "7:00", Date = new DateTime(2024, 2, 1)},
            new Concert { Id = 2, VenueId = 2, Time = "8:30", Date = new DateTime(2024, 2, 5)},
            new Concert { Id = 3, VenueId = 3, Time = "6:45", Date = new DateTime(2024, 2, 10)},
            new Concert { Id = 4, VenueId = 4, Time = "9:15", Date = new DateTime(2024, 2, 15)},
            new Concert { Id = 5, VenueId = 5, Time = "7:30", Date = new DateTime(2024, 2, 20)},
            new Concert { Id = 6, VenueId = 1, Time = "8:00", Date = new DateTime(2024, 2, 25)},
            new Concert { Id = 7, VenueId = 2, Time = "6:15", Date = new DateTime(2024, 2, 8)},
            new Concert { Id = 8, VenueId = 3, Time = "9:45", Date = new DateTime(2024, 2, 13)},
            new Concert { Id = 9, VenueId = 4, Time = "7:45", Date = new DateTime(2024, 2, 18)},
            new Concert { Id = 10, VenueId = 5, Time = "8:15", Date = new DateTime(2024, 2, 23)},
        });

        modelBuilder.Entity<BandConcert>().HasData(new BandConcert[]
        {
            //headlining bands for concerts 1 - 10
            new BandConcert { Id = 1, BandId = 1, ConcertId = 1},
            new BandConcert { Id = 2, BandId = 1, ConcertId = 2},
            new BandConcert { Id = 3, BandId = 2, ConcertId = 3},
            new BandConcert { Id = 4, BandId = 2, ConcertId = 4},
            new BandConcert { Id = 5, BandId = 3, ConcertId = 5},
            new BandConcert { Id = 6, BandId = 3, ConcertId = 6},
            new BandConcert { Id = 7, BandId = 4, ConcertId = 7},
            new BandConcert { Id = 8, BandId = 4, ConcertId = 8},
            new BandConcert { Id = 9, BandId = 5, ConcertId = 9},
            new BandConcert { Id = 10, BandId = 5, ConcertId = 10},

            // Supporting Bands for Concert ID 1
            new BandConcert { Id = 11, BandId = 6, ConcertId = 1},
            new BandConcert { Id = 12, BandId = 7, ConcertId = 1},

            // Bands for Concert ID 2
            new BandConcert { Id = 13, BandId = 6, ConcertId = 2},
            new BandConcert { Id = 14, BandId = 7, ConcertId = 2},

            // Bands for Concert ID 3
            new BandConcert { Id = 15, BandId = 8, ConcertId = 3},
            new BandConcert { Id = 16, BandId = 9, ConcertId = 3},

            // Bands for Concert ID 4
            new BandConcert { Id = 17, BandId = 8, ConcertId = 4},
            new BandConcert { Id = 18, BandId = 9, ConcertId = 4},

            // Bands for Concert ID 5
            new BandConcert { Id = 19, BandId = 10, ConcertId = 5},
            new BandConcert { Id = 20, BandId = 9, ConcertId = 5},

              // Bands for Concert ID 6
            new BandConcert { Id = 21, BandId = 8, ConcertId = 6},
            new BandConcert { Id = 22, BandId = 6, ConcertId = 6},

            // Bands for Concert ID 7
            new BandConcert { Id = 23, BandId = 7, ConcertId = 7},
            new BandConcert { Id = 24, BandId = 10, ConcertId = 7},

            // Bands for Concert ID 8
            new BandConcert { Id = 25, BandId = 8, ConcertId = 8},
            
            // Bands for Concert ID 9
            new BandConcert { Id = 27, BandId = 8, ConcertId = 9},
           
            // Bands for Concert ID 10
            new BandConcert { Id = 29, BandId = 6, ConcertId = 10},
            new BandConcert { Id = 30, BandId = 10, ConcertId = 10}
            


        });




    }
}