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

            .Select(band => new BandDTO
            {
                Id = band.Id,
                Name = band.Name,
                Bio = band.Bio,
                Genre = band.Genre,
                IsHeadliner = band.IsHeadliner,
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
            BandMembers = band.BandMembers.Select(bandMember => new BandMemberDTO
            {
                Id = bandMember.Id,
                Name = bandMember.Name,
                Instrument = bandMember.Instrument

            }).ToList()

            // Add other properties as needed
        };

        return Ok(bandDTO);
    }






}


