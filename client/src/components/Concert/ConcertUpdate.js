import { getConcertById, updateConcert } from "../../managers/ConcertManager";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { VenueDropdown } from "../VenueDropdown";
import { DatePick } from "../DatePick";
import { TimePick } from "../TimePick";
import { HeadliningBandDropdown } from "../HeadliningBandDropDown";
import { SupportingBandsCheck } from "../SupportingBandsCheck";

export const ConcertUpdate = ({ handleGetConcerts }) => {
  console.log("handleGetConcerts in ConcertUpdate:", handleGetConcerts);
  const { id } = useParams();
  const concertId = id;

  const navigate = useNavigate();

  const [concert, setConcert] = useState({});

  //===========================================================================

  const handleGetincomingConcert = (id) => {
    getConcertById(id).then(setConcert);
  };

  useEffect(() => {
    handleGetincomingConcert(concertId);
  }, []);

  //=========================================================================re
  //On Change functions

  const handleDate = (event) => {
    setConcert({ ...concert, date: event.target.value });
  };

  const handleTime = (event) => {
    setConcert({ ...concert, time: event.target.value });
  };

  const handleVenue = (event) => {
    setConcert({ ...concert, venueId: event.target.value });
  };

  const handleHeadliner = (event) => {
    const selectedHeadlinerId = event.target.value * 1;

    // Find the bandConcert object where the isHeadliner is true in the concert object
    let currentHeadlinerBandObj = concert?.bandConcerts?.find(
      (bc) => bc.band.isHeadliner === true
    );

    //if no headlining band currently exists, set the selected band as the headliner
    if (currentHeadlinerBandObj === undefined) {
      currentHeadlinerBandObj = { bandId: selectedHeadlinerId };
      const copy = { ...concert };
      copy.bandConcerts.push({
        bandId: selectedHeadlinerId,
        band: {
          isHeadliner: true,
        },
      });

      setConcert(copy);
    } else if (currentHeadlinerBandObj?.bandId !== selectedHeadlinerId) {
      // Update the bandId of the current headliner directly
      currentHeadlinerBandObj.bandId = selectedHeadlinerId;
      // Update the concert state with the modified bandConcerts array
      setConcert({ ...concert, bandConcerts: [...concert.bandConcerts] });
    }
  };

  const handleCheckboxes = (event) => {
    // Extracting bandId and isChecked from the event
    const bandId = event.target.value;
    const isChecked = event.target.checked; //true or false

    setConcert((currentConcert) => {
      // If the checkbox gets checked, add a new band concert with the specified bandId
      const updatedBandConcerts = isChecked
        ? [...currentConcert.bandConcerts, { bandId: bandId * 1 }]
        : // If the checkbox is unchecked, remove the band concert with the specified bandId
          //instead of "removing" it you are just creating an array without it
          currentConcert.bandConcerts.filter(
            (bandConcert) => bandConcert.bandId !== bandId * 1
          );

      // Returning the updated state
      return {
        ...currentConcert,
        bandConcerts: updatedBandConcerts,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const copy = { ...concert };
    copy.bandConcerts = copy.bandConcerts.map((bandConcert) => ({
      bandId: bandConcert.bandId,
    }));
    updateConcert(concert.id, copy).then(() => {
      handleGetConcerts(); // Refetch concerts
      navigate("/"); // Navigate to home or any other route after updating
    });
  };

  const handleCancel = (event) => {
    navigate("/");
  };

  //===========================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 flex justify-center items-center">
      <div className="max-w-xl w-full p-3 bg-white rounded-md">
        <h2 className="text-lg font-semibold mb-2">Make Changes</h2>
        <form className="p-5 max-w-xl border border-black rounded-md shadow-sm bg-white">
          <DatePick datePick={handleDate} concert={concert} />
          <TimePick concert={concert} concertTime={handleTime} />
          <VenueDropdown
            selectedVenueId={concert.venueId}
            venueSelect={handleVenue}
          />
          <HeadliningBandDropdown
            concert={concert}
            headlinerSelect={handleHeadliner}
          />
          <SupportingBandsCheck
            concert={concert}
            handleSupporting={handleCheckboxes}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={handleSubmit}>
            Submit
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-5"
            onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};
