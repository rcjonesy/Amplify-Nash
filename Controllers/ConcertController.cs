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
//The constructor ensures that the object is in a valid state right from the moment it's created.
//The constructor is responsible for setting the initial state of an object when it is created.
public class ConcertController : ControllerBase
{
    private AmplifyNashDbContext _dbContext;

    public ConcertController(AmplifyNashDbContext context)
    {
        _dbContext = context;
    }

    //=================================================================================================

    //Get All Concerts 
    [HttpGet]
    //Authorize
    public IActionResult Get()
    {


        DateTime yesterday = DateTime.Now.AddDays(-1).Date;

        return Ok(_dbContext
            .Concerts
              .Include(concert => concert.Venue)
              .Include(concert => concert.BandConcerts)
                    .ThenInclude(bandConcert => bandConcert.Band)
               .Where(concert => concert.Date > yesterday)
            .OrderBy(concert => concert.Date)
            .Select(concert => new ConcertDTO
            {
                Id = concert.Id,
                VenueId = concert.VenueId,
                Venue = new VenueDTO
                {
                    Id = concert.Venue.Id,
                    Name = concert.Venue.Name,
                    Address = concert.Venue.Address,
                    PhoneNumber = concert.Venue.PhoneNumber,
                    Capacity = concert.Venue.Capacity
                },
                BandConcerts = concert.BandConcerts.Select(bc => new BandConcertDTO
                {
                    Id = bc.Id,
                    BandId = bc.BandId,
                    Band = new BandDTO
                    {
                        Id = bc.Band.Id,
                        Name = bc.Band.Name,
                        IsHeadliner = bc.Band.IsHeadliner
                    },
                    ConcertId = bc.ConcertId

                }).ToList(),
                Time = concert.Time,
                Date = concert.Date,
                TicketsSold = concert.TicketsSold,
            })
            .ToList());
    }

    //=================================================================================================

    //get all concerts by Id
    [HttpGet("{id}")]
    public IActionResult GetConcertById(int id)
    {
        Concert? concert = _dbContext.Concerts
            .Include(c => c.Venue)
            .Include(c => c.BandConcerts)
                .ThenInclude(bc => bc.Band)
            .SingleOrDefault(c => c.Id == id);

        if (concert == null)
        {
            return NotFound();
        }

        ConcertDTO concertDTO = new ConcertDTO
        {
            Id = concert.Id,
            VenueId = concert.VenueId,
            Venue = new VenueDTO
            {
                Id = concert.Venue.Id,
                Name = concert.Venue.Name,
                Address = concert.Venue.Address,
                PhoneNumber = concert.Venue.PhoneNumber,
                Capacity = concert.Venue.Capacity
            },
            BandConcerts = concert.BandConcerts.Select(bc => new BandConcertDTO
            {
                Id = bc.Id,
                BandId = bc.BandId,
                Band = new BandDTO
                {
                    Id = bc.Band.Id,
                    Name = bc.Band.Name,
                    IsHeadliner = bc.Band.IsHeadliner
                },
                ConcertId = bc.ConcertId
            }).ToList(),
            Time = concert.Time,
            Date = concert.Date,
            TicketsSold = concert.TicketsSold,
            // Add other properties as needed
        };

        return Ok(concertDTO);
    }

    //=================================================================================================
    //delete concert

    [HttpDelete("{id}")]
    public IActionResult DeleteConcert(int id)
    {
        Concert? concertToDelete = _dbContext.Concerts.SingleOrDefault(c => c.Id == id);

        if (concertToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Concerts.Remove(concertToDelete);
        _dbContext.SaveChanges();

        return Ok("Concert deleted successfully");
    }

    //=================================================================================================
    //new concert

    [HttpPost]
    // [Authorize]

    public IActionResult NewConcert(Concert newConcert)
    {


        _dbContext.Concerts.Add(newConcert);
        _dbContext.SaveChanges();
        return Created($"/api/concert/{newConcert.Id}", newConcert);
    }


    //=================================================================================================



    [HttpPut("{id}")]
    // [Authorize]
    public IActionResult UpdateConcert(int id, Concert incomingConcert)
    {
        Concert? concertToUpdate = _dbContext.Concerts
        .Include(concert => concert.BandConcerts)
        .SingleOrDefault(c => c.Id == id);
        if (concertToUpdate == null)
        {
            return NotFound();
        }

        // Apply changes directly to the entity fetched from the database
        concertToUpdate.VenueId = incomingConcert.VenueId;
        concertToUpdate.Time = incomingConcert.Time;
        concertToUpdate.Date = incomingConcert.Date;
        // then we override band concerts
        concertToUpdate.BandConcerts = incomingConcert.BandConcerts;

        _dbContext.SaveChanges();

        return Ok("Concert updated successfully");
    }


}

