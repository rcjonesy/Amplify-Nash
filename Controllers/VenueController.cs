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
public class VenueController : ControllerBase
{
    private AmplifyNashDbContext _dbContext;

    public VenueController(AmplifyNashDbContext context)
    {
        _dbContext = context;
    }


    //=================================================================================================

    [HttpGet]
    // Authorize
    public IActionResult Get()
    {
        return Ok(_dbContext
            .Venues
            .Select(venue => new VenueDTO
            {
                Id = venue.Id,
                Name = venue.Name,
                Address = venue.Address,
                PhoneNumber = venue.PhoneNumber,
                Capacity = venue.Capacity
            })
            .ToList());
    }


    //=================================================================================================
    //delete venue

    [HttpDelete("{id}")]
    public IActionResult DeleteVenue(int id)
    {
        Venue? venueToDelete = _dbContext.Venues.SingleOrDefault(v => v.Id == id);

        if (venueToDelete == null)
        {
            return NotFound();
        }

        _dbContext.Venues.Remove(venueToDelete);
        _dbContext.SaveChanges();

        return Ok("Venue deleted successfully");
    }

    //=================================================================================================
    //add venue

    [HttpPost]
    // [Authorize]

    public IActionResult NewVenue(Venue newVenue)
    {

        _dbContext.Venues.Add(newVenue);
        _dbContext.SaveChanges();
        return Created($"/api/venue/{newVenue.Id}", newVenue);
    }


}


