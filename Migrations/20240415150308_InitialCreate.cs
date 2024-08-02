using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AmplifyNash.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: true),
                    Address = table.Column<string>(type: "text", nullable: true),
                    IdentityUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProfiles_AspNetUsers_IdentityUserId",
                        column: x => x.IdentityUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Bands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Bio = table.Column<string>(type: "text", nullable: false),
                    Genre = table.Column<string>(type: "text", nullable: false),
                    Img = table.Column<string>(type: "text", nullable: true),
                    IsHeadliner = table.Column<bool>(type: "boolean", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bands_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Venues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    Capacity = table.Column<int>(type: "integer", nullable: false),
                    UserProfileId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Venues_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BandMembers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Instrument = table.Column<string>(type: "text", nullable: false),
                    BandId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BandMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BandMembers_Bands_BandId",
                        column: x => x.BandId,
                        principalTable: "Bands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LikedBands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BandId = table.Column<int>(type: "integer", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    UserProfileId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikedBands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikedBands_Bands_BandId",
                        column: x => x.BandId,
                        principalTable: "Bands",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LikedBands_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Concerts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VenueId = table.Column<int>(type: "integer", nullable: false),
                    Time = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    TicketsSold = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concerts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Concerts_Venues_VenueId",
                        column: x => x.VenueId,
                        principalTable: "Venues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BandConcerts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BandId = table.Column<int>(type: "integer", nullable: false),
                    ConcertId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BandConcerts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BandConcerts_Bands_BandId",
                        column: x => x.BandId,
                        principalTable: "Bands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BandConcerts_Concerts_ConcertId",
                        column: x => x.ConcertId,
                        principalTable: "Concerts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConcertInterests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ConcertId = table.Column<int>(type: "integer", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    UserProfileId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConcertInterests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConcertInterests_Concerts_ConcertId",
                        column: x => x.ConcertId,
                        principalTable: "Concerts",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ConcertInterests_UserProfiles_UserProfileId",
                        column: x => x.UserProfileId,
                        principalTable: "UserProfiles",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "90b011d3-7a6d-4377-b9ed-9e93238f0f41", "Admin", "admin" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", 0, "3dde86ae-c6a9-4c70-95a3-720442f9051c", "admina@strator.comx", false, false, null, null, null, "AQAAAAEAACcQAAAAEFviZy1uBrTg3Bk3bEGzcA7C/xlwbazhrPuGfNAiPbE6tME7aDnZ+U0AdtmgAdWSRg==", null, false, "34043076-f46a-4da4-a18c-803fce37cef3", false, "Administrator" });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "c3aaeb97-d2ba-4a53-a521-4eea61e59b35", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f" });

            migrationBuilder.InsertData(
                table: "UserProfiles",
                columns: new[] { "Id", "Address", "FirstName", "IdentityUserId", "LastName" },
                values: new object[] { 1, "101 Main Street", "Admina", "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f", "Strator" });

            migrationBuilder.InsertData(
                table: "Bands",
                columns: new[] { "Id", "Bio", "Genre", "Img", "IsHeadliner", "Name", "UserProfileId" },
                values: new object[,]
                {
                    { 1, "From the vibrant city of Austin, Texas, formed in 2010. Indie rock enchantment at its finest.", "Indie Rock", "./Lunar.png", true, "Lunar Essence", 1 },
                    { 2, "Hailing from the eclectic city of Seattle, Washington, formed in 2013. Alternative rock pushing the boundaries.", "Rock", "./Sonic.png", true, "Sonic Catalyst", 1 },
                    { 3, "Emerging from the creative hub of Los Angeles, California, formed in 2012. Indie pop melodies that resonate with the soul.", "Indie Pop", "./Aurora.png", true, "Aurora Melodies", 1 },
                    { 4, "Born in the lively city of Nashville, Tennessee, formed in 2008. Rock anthems with a revolutionary spirit.", "Rock", "./Rebel.png", true, "Rebel Resonance", 1 },
                    { 5, "From the serene city of Portland, Oregon, formed in 2015. Dreamy indie rock under the starry sky.", "Indie Rock", "./Whispering.png", true, "Whispering Echoes", 1 },
                    { 6, "Infusing colors into soundwaves, based in San Francisco, California, formed in 2014. Indie electro-pop exploration.", "Indie Electro-Pop", "./Hues.png", false, "Electric Hues", 1 },
                    { 7, "Building grooves in the heart of New York City, formed in 2011. Fusion of funk, soul, and jazz.", "Funk/Soul/Jazz Fusion", "./Urban.png", false, "Urban Groove Collective", 1 },
                    { 8, "Painting the musical canvas from Chicago, Illinois, formed in 2016. Synth-driven alt-rock landscapes.", "Alternative Rock", "./Neon.png", false, "Neon Skylines", 1 },
                    { 9, "Harmonizing in the misty streets of New Orleans, Louisiana, formed in 2017. Soulful indie melodies with a touch of jazz.", "Indie/Soul/Jazz Fusion", "./Crimson.png", false, "Crimson Harmony", 1 },
                    { 10, "Channeling mystic vibes from Santa Fe, New Mexico, formed in 2019. Psychedelic rock explorations.", "Psychedelic Rock", "./Mystic.png", false, "Mystic Soundwaves", 1 }
                });

            migrationBuilder.InsertData(
                table: "Venues",
                columns: new[] { "Id", "Address", "Capacity", "Name", "PhoneNumber", "UserProfileId" },
                values: new object[,]
                {
                    { 1, "917 Woodland St, Nashville, TN 37206", 150, "Basement East", "(615) 645-9174", 1 },
                    { 2, "818 3rd Ave S, Nashville, TN 37210", 700, "3rd and Lindsley", "(615) 259-9891", 1 },
                    { 3, "1 Cannery Row, Nashville, TN 37203", 225, "The High Watt", "(615) 251-3020", 1 },
                    { 4, "1604 8th Ave S, Nashville, TN 37203", 300, "The Basement", "(615) 254-8006", 1 },
                    { 5, "2208 Elliston Pl, Nashville, TN 37203", 125, "Exit/In", "(615) 321-3340", 1 },
                    { 6, "2412 Gallatin Ave, Nashville, TN 37206", 100, "The East Room", "(615) 335-3137", 1 },
                    { 7, "2511 Gallatin Ave, Nashville, TN 37206", 350, "The Cobra Nashville", "(615) 226-4875", 1 },
                    { 8, "2219 Elliston Pl, Nashville, TN 37203", 275, "The End", "(615) 321-4457", 1 },
                    { 9, "402 12th Ave S, Nashville, TN 37203", 145, "The Station Inn", "(615) 255-3307", 1 },
                    { 10, "1 Cannery Row, Nashville, TN 37203", 210, "Mercy Lounge", "(615) 251-3020", 1 }
                });

            migrationBuilder.InsertData(
                table: "BandMembers",
                columns: new[] { "Id", "BandId", "Instrument", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Lead Guitar", "Adam Turner" },
                    { 2, 1, "Vocals", "Emma Harris" },
                    { 3, 1, "Bass", "Ryan Thompson" },
                    { 4, 1, "Drums", "Mia Jackson" },
                    { 5, 2, "Bass", "Jordan Wilson" },
                    { 6, 2, "Guitar", "Ava Robinson" },
                    { 7, 2, "Vocals", "Ethan Turner" },
                    { 8, 2, "Drums", "Sophia Evans" },
                    { 9, 3, "Drums", "Nathan Scott" },
                    { 10, 3, "Guitar", "Olivia Reed" },
                    { 11, 3, "Vocals", "Aiden Murphy" },
                    { 12, 3, "Bass", "Zoe Turner" },
                    { 13, 4, "Bass", "Elijah Miller" },
                    { 14, 4, "Vocals", "Chloe Davis" },
                    { 15, 4, "Drums", "Isaac Parker" },
                    { 16, 4, "Guitar", "Lily Brooks" },
                    { 17, 5, "Vocals", "Owen Harris" },
                    { 18, 5, "Guitar", "Grace Turner" },
                    { 19, 5, "Bass", "Lucas Foster" },
                    { 20, 5, "Drums", "Ella Reed" },
                    { 21, 6, "Guitar", "Liam Anderson" },
                    { 22, 6, "Vocals", "Ava Martinez" },
                    { 23, 6, "Bass", "Noah White" },
                    { 24, 6, "Drums", "Harper Thompson" },
                    { 25, 7, "Drums", "Mason Turner" },
                    { 26, 7, "Guitar", "Lily Harris" },
                    { 27, 7, "Vocals", "Elijah Robinson" },
                    { 28, 7, "Bass", "Zoey Miller" },
                    { 29, 8, "Bass", "Logan Scott" },
                    { 30, 8, "Guitar", "Mia Foster" },
                    { 31, 8, "Vocals", "Carter Reed" },
                    { 32, 8, "Drums", "Emma Davis" },
                    { 33, 9, "Drums", "Wyatt Parker" },
                    { 34, 9, "Guitar", "Ava Turner" },
                    { 35, 9, "Vocals", "Owen Murphy" },
                    { 36, 9, "Bass", "Isabella Brooks" },
                    { 37, 10, "Vocals", "Jackson Harris" },
                    { 38, 10, "Guitar", "Scarlett Turner" },
                    { 39, 10, "Bass", "Ethan Foster" },
                    { 40, 10, "Drums", "Sofia Reed" }
                });

            migrationBuilder.InsertData(
                table: "Concerts",
                columns: new[] { "Id", "Date", "TicketsSold", "Time", "VenueId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "7:00", 1 },
                    { 2, new DateTime(2024, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "8:30", 2 },
                    { 3, new DateTime(2024, 2, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "6:45", 3 },
                    { 4, new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "9:15", 4 },
                    { 5, new DateTime(2024, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "7:30", 5 },
                    { 6, new DateTime(2024, 2, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "8:00", 1 },
                    { 7, new DateTime(2024, 2, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "6:15", 2 },
                    { 8, new DateTime(2024, 2, 13, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "9:45", 3 },
                    { 9, new DateTime(2024, 2, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "7:45", 4 },
                    { 10, new DateTime(2024, 2, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "8:15", 5 }
                });

            migrationBuilder.InsertData(
                table: "BandConcerts",
                columns: new[] { "Id", "BandId", "ConcertId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 1, 2 },
                    { 3, 2, 3 },
                    { 4, 2, 4 },
                    { 5, 3, 5 },
                    { 6, 3, 6 },
                    { 7, 4, 7 },
                    { 8, 4, 8 },
                    { 9, 5, 9 },
                    { 10, 5, 10 },
                    { 11, 6, 1 },
                    { 12, 7, 1 },
                    { 13, 6, 2 },
                    { 14, 7, 2 },
                    { 15, 8, 3 },
                    { 16, 9, 3 },
                    { 17, 8, 4 },
                    { 18, 9, 4 },
                    { 19, 10, 5 },
                    { 20, 9, 5 },
                    { 21, 8, 6 },
                    { 22, 6, 6 },
                    { 23, 7, 7 },
                    { 24, 10, 7 },
                    { 25, 8, 8 },
                    { 27, 8, 9 },
                    { 29, 6, 10 },
                    { 30, 10, 10 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BandConcerts_BandId",
                table: "BandConcerts",
                column: "BandId");

            migrationBuilder.CreateIndex(
                name: "IX_BandConcerts_ConcertId",
                table: "BandConcerts",
                column: "ConcertId");

            migrationBuilder.CreateIndex(
                name: "IX_BandMembers_BandId",
                table: "BandMembers",
                column: "BandId");

            migrationBuilder.CreateIndex(
                name: "IX_Bands_UserProfileId",
                table: "Bands",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_ConcertInterests_ConcertId",
                table: "ConcertInterests",
                column: "ConcertId");

            migrationBuilder.CreateIndex(
                name: "IX_ConcertInterests_UserProfileId",
                table: "ConcertInterests",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Concerts_VenueId",
                table: "Concerts",
                column: "VenueId");

            migrationBuilder.CreateIndex(
                name: "IX_LikedBands_BandId",
                table: "LikedBands",
                column: "BandId");

            migrationBuilder.CreateIndex(
                name: "IX_LikedBands_UserProfileId",
                table: "LikedBands",
                column: "UserProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_IdentityUserId",
                table: "UserProfiles",
                column: "IdentityUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Venues_UserProfileId",
                table: "Venues",
                column: "UserProfileId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "BandConcerts");

            migrationBuilder.DropTable(
                name: "BandMembers");

            migrationBuilder.DropTable(
                name: "ConcertInterests");

            migrationBuilder.DropTable(
                name: "LikedBands");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Concerts");

            migrationBuilder.DropTable(
                name: "Bands");

            migrationBuilder.DropTable(
                name: "Venues");

            migrationBuilder.DropTable(
                name: "UserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
