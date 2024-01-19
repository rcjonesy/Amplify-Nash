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


}


