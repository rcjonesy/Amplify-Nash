using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using AmplifyNash.Models;
using AmplifyNash.Models.DTOs;
using AmplifyNash.Data;
using Microsoft.EntityFrameworkCore;

namespace AmplifyNash.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UserProfileController : ControllerBase
{
    private AmplifyNashDbContext _dbContext;

    public UserProfileController(AmplifyNashDbContext context)
    {
        _dbContext = context;
    }


    //===================================================================================================================


    [HttpGet]
    // [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext.UserProfiles
            .Include(up => up.ConcertInterests)
            .Include(up => up.LikedBands)
            .Select(userProfile => new UserProfileDTO
            {
                Id = userProfile.Id,
                FirstName = userProfile.FirstName,
                LastName = userProfile.LastName,
                Address = userProfile.Address,
                ConcertInterests = userProfile.ConcertInterests.Select(concertInterest => new ConcertInterestDTO
                {
                    Id = concertInterest.Id,
                    ConcertId = concertInterest.ConcertId, // Assuming ConcertId is a property of ConcertInterest
                    UserId = concertInterest.UserId // Assuming UserId is a property of ConcertInterest
                }).ToList(),
                LikedBands = userProfile.LikedBands.Select(likedBand => new LikedBandDTO
                {
                    Id = likedBand.Id,
                    BandId = likedBand.BandId,
                    UserId = likedBand.UserId
                }).ToList()
            })
            .ToList());
    }

    //===================================================================================================================
    // Get By Id

    [HttpGet("{id}")]
    // [Authorize]
    public IActionResult GetById(int id)
    {
        UserProfile? userProfile = _dbContext.UserProfiles
            .Include(up => up.ConcertInterests)
            .Include(up => up.LikedBands)
            .FirstOrDefault(up => up.Id == id);

        if (userProfile == null)
        {
            return NotFound();
        }

        UserProfileDTO userProfileDTO = new UserProfileDTO
        {
            Id = userProfile.Id,
            FirstName = userProfile.FirstName,
            LastName = userProfile.LastName,
            Address = userProfile.Address,
            ConcertInterests = userProfile.ConcertInterests.Select(concertInterest => new ConcertInterestDTO
            {
                Id = concertInterest.Id,
                ConcertId = concertInterest.ConcertId, // Assuming ConcertId is a property of ConcertInterest
                UserId = concertInterest.UserId // Assuming UserId is a property of ConcertInterest
            }).ToList(),
            LikedBands = userProfile.LikedBands.Select(likedBand => new LikedBandDTO
            {
                Id = likedBand.Id,
                BandId = likedBand.BandId,
                UserId = likedBand.UserId
            }).ToList()

        };

        return Ok(userProfileDTO); // Return the DTO, not the entity
    }





}