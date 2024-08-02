import { postNewConcert } from "../../managers/ConcertManager";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VenueDropdown } from "../VenueDropdown";
import { HeadliningBandDropdown } from "../HeadliningBandDropDown";
import { SupportingBandsCheck } from "../SupportingBandsCheck";
import { TimePick } from "../TimePick";
import { DatePick } from "../DatePick";

export const BookConcert = ({ concerts, handleGetConcerts, bands }) => {
  const navigate = useNavigate();

  const [newConcert, setNewConcert] = useState({
    date: "",
    time: "",
    venueId: "",
    bandConcerts: [],
  });

  const convertedConcerts = concerts.map((concert) => {
    return {
      ...concert,
      date: concert.date.split("T")[0],
    };
  });

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

  const handleSupportingCheck = (event) => {
    const bandId = event.target.value;
    const isChecked = event.target.checked;

    setNewConcert((currentConcert) => {
      const updatedBandConcerts = isChecked
        ? [...currentConcert.bandConcerts, { bandId: bandId }]
        : currentConcert.bandConcerts.filter(
            (bandConcert) => bandConcert.bandId !== bandId
          );

      return {
        ...currentConcert,
        bandConcerts: updatedBandConcerts,
      };
    });
  };

  const handleSubmit = (event, concertObj) => {
    event.preventDefault();

    //-------------------------------------------------------------------------------------
    //dealing with no date or time and prevent double booking

    if (concertObj.date.trim() === "" || concertObj.time.trim() === "") {
      alert("Please fill in both date and time.");
      return;
    }

    const isDateAndVenueTaken = convertedConcerts.some((concert) => {
      return (
        concert.date === concertObj.date &&
        concert.venueId === concertObj.venueId
      );
    });

    if (isDateAndVenueTaken) {
      alert("A concert with the same date and venue already exists");
      return;
    }

    //extracting band Id's from concert being booked
    const bandsToBook = concertObj.bandConcerts.map(
      (bandConcert) => bandConcert.bandId * 1
    );
    //extracting band id's of the bands already booked that day if any
    const bandsAlreadyBookedThatDay = convertedConcerts
      .filter((concert) => concert.date === concertObj.date) // Filter by date
      .flatMap((concert) =>
        concert.bandConcerts.map((bandConcert) => bandConcert.bandId * 1)
      );

    //array to hold Id's of bands that can't be booked because they are already booked
    const doubleBookedIds = [];
    const doubleBookedNames = [];

    for (let i = 0; i < bandsToBook.length; i++) {
      for (let j = 0; j < bandsAlreadyBookedThatDay.length; j++) {
        if (bandsToBook[i] === bandsAlreadyBookedThatDay[j]) {
          doubleBookedIds.push(bandsToBook[i]);
        }
      }
    }

    for (let i = 0; i < bandsToBook.length; i++) {
      for (let j = 0; j < bands.length; j++) {
        if (bandsToBook[i] === bands[j].id) {
          doubleBookedNames.push(bands[j].name);
        }
      }
    }

    if (doubleBookedNames.length !== 0) {
      const message = `The following bands are double-booked: ${doubleBookedNames.join(
        ", "
      )}`;
      alert(message);
      return;
    }

    //-------------------------------------------------------------------------------------

    postNewConcert(concertObj).then(() => {
      handleGetConcerts(); // Refresh concerts
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
          <DatePick concert={newConcert} datePick={datePick} />
          <TimePick concert={newConcert} concertTime={concertTime} />
          <VenueDropdown
            venueSelect={venueSelect}
            selectedVenueId={newConcert.venueId}
          />
          <HeadliningBandDropdown
            headlinerSelect={headlinerSelect}
            concert={newConcert}
          />
          <SupportingBandsCheck handleSupporting={handleSupportingCheck} />

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
