namespace AmplifyNash.Models.DTOs;

public class ConcertDTO
{
    public int Id { get; set; }
    public int VenueId { get; set; }
    public VenueDTO Venue { get; set; }
    public List<BandDTO> Bands { get; set; }
    public string Time { get; set; }
    public DateTime Date { get; set; }
    public int TicketsSold { get; set; }
   public int TicketsAvailable
    {
        get
        {
            if (Venue != null)
            {
                return Venue.Capacity - TicketsSold;
            }
            else
            {
                return 0;
            }
        }
    }
}

