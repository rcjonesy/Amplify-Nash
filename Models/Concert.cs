namespace AmplifyNash.Models;

public class Concert
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int VenueId { get; set; }
    public Venue Venue { get; set; }
    public List<Band> Bands { get; set; }
    public string Time { get; set; }
    public DateTime Date { get; set; }
    public int TicketsSold { get; set; }
    public int TicketsAvailable { get; set; }
}


