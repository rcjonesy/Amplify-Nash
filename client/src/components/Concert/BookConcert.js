import { getAllVenues } from "../../managers/VenueManager";
import {
  getHeadliningBands,
  getSupportingBands,
} from "../../managers/BandManager";
import { postNewConcert } from "../../managers/ConcertManager";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BookConcert = () => {
  const navigate = useNavigate();

  // const [date, setDate] = useState(new Date());

  const [newConcert, setNewConcert] = useState({
    date: "",
    time: "",
    venueId: "",
    bandConcerts: [],
  });

  const [venues, setVenues] = useState([]);
  const [supporting, setSupporting] = useState([]);
  const [headliners, setHeadliners] = useState([]);

  const handleGetVenues = () => {
    getAllVenues().then(setVenues);
  };

  const handleGetSupporting = () => {
    getSupportingBands().then(setSupporting);
  };

  const handleGetHeadliners = () => {
    getHeadliningBands().then(setHeadliners);
  };

  useEffect(() => {
    handleGetVenues();
    handleGetSupporting();
    handleGetHeadliners();
  }, []);

  //====================================================================

  const datePick = (event) => {
    setNewConcert({ ...newConcert, date: event.target.value });
  };

  const concertTime = (event) => {
    setNewConcert({ ...newConcert, time: event.target.value });
  };

  const venueSelect = (event) => {
    setNewConcert({ ...newConcert, venueId: event.target.value * 1 });
  };

  const headlinerSelect = (event) => {
    setNewConcert({
      ...newConcert,
      bandConcerts: [{ bandId: event.target.value * 1 }],
    });
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in the format YYYY-MM-DD

  const handleSupportingCheck = (event) => {
    // Extracting bandId and isChecked from the event
    const bandId = event.target.value;
    const isChecked = event.target.checked; //true or false

    // Updating the state using setNewConcert
    setNewConcert((currentConcert) => {
      // If the checkbox is checked, add a new band concert with the specified bandId
      const updatedBandConcerts = isChecked
        ? [...currentConcert.bandConcerts, { bandId: bandId }]
        : // If the checkbox is unchecked, remove the band concert with the specified bandId
          //instead of "removing" it you are just creating an array without it
          currentConcert.bandConcerts.filter(
            (bandConcert) => bandConcert.bandId !== bandId
          );

      // Returning the updated state
      return {
        ...currentConcert,
        bandConcerts: updatedBandConcerts,
      };
    });
  };

  const handleSubmit = (event, concertObj) => {
    event.preventDefault();

    if (concertObj.date.trim() === "" || concertObj.time.trim() === "") {
      // If either date or time is empty, display an error message or handle it accordingly
      alert("Please fill in both date and time.");
      return;
    }

    postNewConcert(concertObj).then(() => {
      navigate("/");
    });
  };

  const handleCancelClick = (event) => {
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full p-3 bg-white rounded-md">
        <h2 className="text-lg font-semibold mb-2">Book Concert</h2>
        <form className="p-5 max-w-xl border border-black rounded-md shadow-sm bg-white">
          <div className="mb-4 relative">
            <label className="block text-gray-600 font-semibold">Date</label>
            <input
              type="date"
              className="mt-1 p-2 w-full border rounded-lg"
              placeholder="Select Date"
              value={newConcert?.date ? newConcert.date.split("T")[0] : ""}
              onChange={datePick}
              min={today} // Set the minimum allowed date to today
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Time</label>
            <input
              type="text"
              name="time"
              className="mt-1 p-2 w-full border rounded-lg appearance-auto"
              placeholder="Enter Time"
              value={newConcert?.time}
              onChange={concertTime}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">Venue</label>
            <select
              name="venue"
              className="mt-1 p-2 w-full border rounded-lg"
              placeholder="Select Venue"
              // value={newConcert?.id || ''}
              onChange={venueSelect}>
              <option value="0">Choose a venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold">
              Headlining Band
            </label>
            <select
              name="headliningBand"
              className="mt-1 p-2  border rounded-lg"
              placeholder="Select Headlining Band"
              value={
                newConcert?.bandConcerts?.find((bc) => bc.band?.isHeadliner)
                  ?.bandId
              }
              onChange={headlinerSelect}>
              <option value="0">Choose a band</option>
              {headliners.map((headliner) => (
                <option key={headliner.id} value={headliner.id}>
                  {headliner.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="text-black font-semibold flex items-center space-x-2 mb-3">
              Supporting Bands
            </label>
            <div>
              {supporting.map((band) => (
                <label
                  key={band.id}
                  className="flex items-center cursor-pointer transition-all duration-300 hover:bg-gray-100 rounded-md p-1">
                  <input
                    type="checkbox"
                    name="supportingBands"
                    value={band.id}
                    className="mr-2 cursor-pointer"
                    onChange={handleSupportingCheck}
                  />
                  {band.name}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={(event) => handleSubmit(event, newConcert)}>
            Submit
          </button>

          <button
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-5"
            onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
