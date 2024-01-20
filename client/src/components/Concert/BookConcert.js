import { getAllVenues } from "../../managers/VenueManager";
import { getHeadliningBands, getSupportingBands } from "../../managers/BandManager";
import { useEffect, useState } from "react";






export const BookConcert = () => {

    const [newConcert, setNewConcert] = useState({
        date: "",
        time: "",
        venue: "", // Add other properties as needed
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
        setNewConcert({ ...newConcert, venue: event.target.value })
    }

    const headlinerSelect = (event) => {
        setNewConcert({
            ...newConcert, bandConcerts: [
                { bandId: event.target.value }
            ]
        })
    }

    // const headlinerSelect = (event) => {
    //     const bandId = event.target.value;
    //     setNewConcert({
    //         ...newConcert,
    //         bandConcerts: [{ bandId }],
    //     });
    // };


    // const handleSupportingCheck = (event) => {
    //     const bandId = event.target.value;
    //     const isChecked = event.target.checked;
    //     let updatedConcert;
    //     if (isChecked) {
    //         updatedConcert = {
    //             ...newConcert, bandConcerts: [
    //                 ...newConcert.bandConcerts,{ bandId: bandId }
    //             ]
    //         };
    //     } else {
    //         updatedConcert = {
    //             ...newConcert,
    //             bandConcerts: newConcert.bandConcerts.filter(bandConcert => bandConcert.bandId !== bandId)
    //         };
    //     }
    //     setNewConcert(updatedConcert);
    // }
    //when you use the shorthand syntax, JavaScript automatically creates a property in the object with the name bandId and assigns the value of the variable bandId to it.



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



    const handleSubmit = () => {

    }

    return (
        <div className=" min-h-screen">
            <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Concert Form</h2>
                <form className="mt-10" onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-600">Date</label>
                        <input
                            type="date"
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                            onChange={datePick}
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-600">Time</label>
                        <input
                            type="text"
                            name="time"
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                            onChange={concertTime}
                        />
                    </div>

                    {/* Venue Select */}
                    <div className="mb-4">
                        <label className="block text-gray-600">Venue</label>
                        <select
                            name="venue"
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                            onChange={venueSelect}
                        >
                            <option value="">Select Venue</option>
                            {venues.map((venue) => (

                                <option key={venue.id} value={venue.id}>{venue.name}</option>

                            ))}
                        </select>
                    </div>


                    {/* Headlining Band Select */}
                    <div className="mb-4">
                        <label className="block text-gray-600">Headlining Band</label>
                        <select
                            name="headliningBand"
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                            onChange={headlinerSelect}
                        >
                            <option value="">Select Headlining Band</option>
                            {headliners.map((headliner) => (

                                <option key={headliner.id} value={headliner.id}>{headliner.name}</option>

                            ))}

                        </select>
                    </div>


                    {/* Supporting Bands Checkboxes */}
                    <div className="mb-4">
                        <label className="block text-gray-600">Supporting Bands</label>
                        <div>
                            {supporting.map((band) => (
                                <label key={band.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="supportingBands"
                                        value={band.id}
                                        className="mr-2"
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
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );

}