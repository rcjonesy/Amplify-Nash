import { getAllVenues } from "../../managers/VenueManager";
import { getHeadliningBands, getSupportingBands } from "../../managers/BandManager";
import { postNewConcert } from "../../managers/ConcertManager";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../../background.css";










export const BookConcert = () => {

    const navigate = useNavigate()

    const [date, setDate] = useState(new Date());

    const [newConcert, setNewConcert] = useState({
        date: "",
        time: "",
        venueId: "",
        bandConcerts: []
    });

    const [venues, setVenues] = useState([])
    const [supporting, setSupporting] = useState([])
    const [headliners, setHeadliners] = useState([])



    const handleGetVenues = () => {
        getAllVenues().then(setVenues)
    }

    const handleGetSupporting = () => {
        getSupportingBands().then(setSupporting)
    }

    const handleGetHeadliners = () => {
        getHeadliningBands().then(setHeadliners)
    }


    useEffect(() => {

        handleGetVenues()
        handleGetSupporting()
        handleGetHeadliners()

    }, [])

    //====================================================================

    const datePick = (event) => {
        setNewConcert({ ...newConcert, date: event.target.value })
    }

    const concertTime = (event) => {
        setNewConcert({ ...newConcert, time: event.target.value })
    }

    const venueSelect = (event) => {
        setNewConcert({ ...newConcert, venueId: event.target.value * 1 })
    }

    const headlinerSelect = (event) => {
        setNewConcert({
            ...newConcert, bandConcerts: [
                { bandId: event.target.value * 1 }
            ]
        })
    }

    const today = new Date().toISOString().split('T')[0]; // Get today's date in the format YYYY-MM-DD








    const handleSupportingCheck = (event) => {
        // Extracting bandId and isChecked from the event
        const bandId = event.target.value;
        const isChecked = event.target.checked; //true or false

        // Updating the state using setNewConcert
        setNewConcert((currentConcert) => {
            // If the checkbox is checked, add a new band concert with the specified bandId
            const updatedBandConcerts = isChecked
                ? [...currentConcert.bandConcerts, { bandId: bandId }]
                // If the checkbox is unchecked, remove the band concert with the specified bandId
                //instead of "removing" it you are just creating an array without it
                : currentConcert.bandConcerts.filter((bandConcert) => bandConcert.bandId !== bandId);

            // Returning the updated state
            return {
                ...currentConcert,
                bandConcerts: updatedBandConcerts,
            };
        });
    };



    const handleSubmit = (event, choreObj) => {

        event.preventDefault()
        postNewConcert(choreObj).then(() => {
            navigate("/")
        })
    }

    return (


        <div className="min-h-screen">
            <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6">BookConcert</h2>
                <form className="mt-10">

                    <div className="mb-4 relative">
                        <label className="block text-gray-600">Date</label>
                        <input
                            type="date"
                            className="mt-1 p-2 w-full border rounded-lg appearance-none shadow-sm"
                            placeholder="Select Date"
                            value={newConcert?.date ? newConcert.date.split('T')[0] : ''}
                            onChange={datePick}
                            min={today} // Set the minimum allowed date to today


                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-600">Time</label>
                        <input
                            type="text"
                            name="time"
                            className="mt-1 p-2 w-full border rounded-lg shadow-sm appearance-auto"
                            placeholder="Enter Time"
                            value={newConcert?.time}
                            onChange={concertTime}
                        />
                    </div>

                    {/* Venue Select */}
                    <div className="mb-4">
                        <label className="block text-gray-600">Venue</label>
                        <select
                            name="venue"
                            className="mt-1 p-2 w-full border rounded-lg shadow-sm"
                            placeholder="Select Venue"
                            // value={newConcert?.id || ''}
                            onChange={venueSelect}
                        >
                            {venues.map((venue) => (
                                <option key={venue.id} value={venue.id}>
                                    {venue.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Headlining Band Select */}
                    <div className="mb-4">
                        <label className="block text-gray-600">Headlining Band</label>
                        <select
                            name="headliningBand"
                            className="mt-1 p-2  border rounded-lg shadow-sm"
                            placeholder="Select Headlining Band"
                            value={newConcert?.bandConcerts?.find(bc => bc.band?.isHeadliner)?.bandId}
                            onChange={headlinerSelect}

                        >
                            {headliners.map((headliner) => (
                                <option key={headliner.id} value={headliner.id}>
                                    {headliner.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="mb-4">
                        <label className="text-black text-xl flex items-center space-x-2 mb-2">Supporting Bands</label>
                        <div>
                            {supporting.map((band) => (
                                <label key={band.id} className="flex items-center cursor-pointer transition-all duration-300 hover:bg-gray-100 rounded-md p-2">
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={(event) => handleSubmit(event, newConcert)}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );

}