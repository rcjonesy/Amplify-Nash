import { getAllVenues } from "../managers/VenueManager";
import { useState, useEffect } from "react";

export const VenueDropdown = ({ venueSelect, selectedVenueId }) => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    getAllVenues().then(setVenues);
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-gray-600 font-semibold">Venue</label>
      <select
        name="venue"
        className="mt-1 p-2 w-full border rounded-lg"
        placeholder="Select Venue"
        onChange={venueSelect}
        value={selectedVenueId}>
        <option value="0">Choose a venue</option>
        {venues.map((venue) => (
          <option key={venue.id} value={venue.id}>
            {venue.name}
          </option>
        ))}
      </select>
    </div>
  );
};


