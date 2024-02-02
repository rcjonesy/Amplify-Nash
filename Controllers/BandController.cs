using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AmplifyNash.Data;
using AmplifyNash.Models.DTOs;
using AmplifyNash.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Runtime.InteropServices;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using System.Linq.Expressions;
using Npgsql.EntityFrameworkCore.PostgreSQL.Design.Internal;
using System.Reflection.Metadata.Ecma335;


namespace AmplifyNash.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BandController : ControllerBase
{
    private AmplifyNashDbContext _dbContext;

    public BandController(AmplifyNashDbContext context)
    {
        _dbContext = context;
    }


    //=================================================================================================

    [HttpGet("headliners")]
    // Authorize
    public IActionResult HeadlinerBands()
    {
        return Ok(_dbContext
            .Bands
            .Where(band => band.IsHeadliner == true)

            .Select(band => new BandDTO
            {
                Id = band.Id,
                Name = band.Name,
                IsHeadliner = band.IsHeadliner
            })
            .ToList());
    }

    //=================================================================================================

    [HttpGet("supporting")]
    // Authorize
    public IActionResult SupportingBands()
    {
        return Ok(_dbContext
            .Bands
            .Where(band => band.IsHeadliner == false)

            .Select(band => new BandDTO
            {
                Id = band.Id,
                Name = band.Name,
                IsHeadliner = band.IsHeadliner
            })
            .ToList());
    }

    //=================================================================================================

    [HttpGet()]
    // Authorize
    public IActionResult AllBands()
    {
        return Ok(_dbContext
            .Bands
            .Include(band => band.BandMembers)
            .OrderBy(band => band.Name)

            .Select(band => new BandDTO
            {
                Id = band.Id,
                Name = band.Name,
                Bio = band.Bio,
                Genre = band.Genre,
                IsHeadliner = band.IsHeadliner,
                Img = band.Img,
                BandMembers = band.BandMembers.Select(bandMember => new BandMemberDTO
                {
                    Id = bandMember.Id,
                    Name = bandMember.Name,
                    Instrument = bandMember.Instrument

                }).ToList()

            })
            .ToList());
    }


    //=================================================================================================


    //get all bands by Id
    [HttpGet("{id}")]
    public IActionResult GetBandById(int id)
    {
        Band? band = _dbContext.Bands
            .Include(band => band.BandMembers)
            .Include(band => band.BandConcerts)
                .ThenInclude(bandConcert => bandConcert.Concert)
                .ThenInclude(concert => concert.Venue)
            .SingleOrDefault(band => band.Id == id);

        if (band == null)
        {
            return NotFound();
        }

        BandDTO bandDTO = new BandDTO
        {
            Id = band.Id,
            Name = band.Name,
            Bio = band.Bio,
            Genre = band.Genre,
            IsHeadliner = band.IsHeadliner,
            Img = band.Img,
            BandConcerts = band.BandConcerts
            .OrderBy(bandConcert => bandConcert.Concert.Date)
            .Select(bandConcert => new BandConcertDTO
            {
                Id = bandConcert.Id,
                ConcertId = bandConcert.ConcertId,
                Concert = bandConcert.Concert != null ? new ConcertDTO
                {
                    Id = bandConcert.ConcertId,
                    Date = bandConcert.Concert.Date,
                    VenueId = bandConcert.Concert.VenueId,
                    Venue = bandConcert.Concert.Venue != null ? new VenueDTO
                    {
                        Name = bandConcert.Concert.Venue.Name
                    } : null
                } : null
            }).ToList(),

            BandMembers = band.BandMembers.Select(bandMember => new BandMemberDTO
            {
                Id = bandMember.Id,
                Name = bandMember.Name,
                Instrument = bandMember.Instrument

            }).ToList()

            
        };

        return Ok(bandDTO);
    }




//=================================================================================================

// add band

    [HttpPost]
    // [Authorize]

    public IActionResult NewBand(Band newBand)
    {

        _dbContext.Bands.Add(newBand);
        _dbContext.SaveChanges();
        return Created($"/api/band/{newBand.Id}", newBand);
    }

 //=================================================================================================

    
    //delete band

    [HttpDelete("{id}")]
    public IActionResult DeleteBand(int id)
    {
        Band? bandToDelete = _dbContext.Bands.SingleOrDefault(b => b.Id == id);

        if (bandToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Bands.Remove(bandToDelete);
        _dbContext.SaveChanges();

        return Ok("band deleted successfully");
    }



}


