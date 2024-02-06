import { getConcertById, updateConcert } from "../../managers/ConcertManager"
import { getHeadliningBands, getSupportingBands } from "../../managers/BandManager"
import { getAllVenues } from "../../managers/VenueManager"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"




export const ConcertUpdate = () => {


    const { id } = useParams()
    const concertId = id

    const navigate = useNavigate()

    const [concert, setConcert] = useState({})
    const [venues, setVenues] = useState([])
    const [headliningBands, setHeadliningBands] = useState([])
    const [supportingBands, setSupportingBands] = useState([])


    //===========================================================================

    const handleGetincomingConcert = (id) => {
        getConcertById(id).then(setConcert)
    }

    const handleGetVenues = () => {
        getAllVenues().then(setVenues)
    }

    const handleHeadliners = () => {
        getHeadliningBands().then(setHeadliningBands)
    }

    const handleSupportingCheck = () => {
        getSupportingBands().then(setSupportingBands)
    }

    useEffect(() => {
        handleGetincomingConcert(concertId)
        handleGetVenues()
        handleHeadliners()
        handleSupportingCheck()
    }, [])

    //=========================================================================re 
    //On Change functions

    const handleDate = (event) => {
        setConcert({ ...concert, date: event.target.value })
    }

    const handleTime = (event) => {
        setConcert({ ...concert, time: event.target.value })
    }

    const handleVenue = (event) => {
        setConcert({ ...concert, venueId: event.target.value })
    }





    const handleHeadliner = (event) => {

        const selectedHeadlinerId = event.target.value * 1;

        // Find the bandConcert object where the isHeadliner is true in the concert object
        let currentHeadlinerBandObj = concert?.bandConcerts?.find(bc => bc.band.isHeadliner === true);

        if (currentHeadlinerBandObj === undefined) {
            currentHeadlinerBandObj = { bandId: selectedHeadlinerId }
            const copy = { ...concert }
            copy.bandConcerts.push(
                {
                    bandId: selectedHeadlinerId,
                    band: {
                        isHeadliner: true
                    }
                })
            
            setConcert(copy)
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
            // If the checkbox is checked, add a new band concert with the specified bandId
            const updatedBandConcerts = isChecked
                ? [...currentConcert.bandConcerts, { bandId: bandId * 1 }]
                // If the checkbox is unchecked, remove the band concert with the specified bandId
                //instead of "removing" it you are just creating an array without it
                : currentConcert.bandConcerts.filter((bandConcert) => bandConcert.bandId !== bandId * 1);

            // Returning the updated state
            return {
                ...currentConcert,
                bandConcerts: updatedBandConcerts,
            };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const copy = { ...concert }
        copy.bandConcerts = copy.bandConcerts.map((bandConcert) => {
            return {
                bandId: bandConcert.bandId
            }
        })
        updateConcert(concert.id, copy)
            .then(() => navigate('/'))

    };

    const handleCancel = (event) => {
        navigate('/')
    }





    //===========================================================================



    return (

        <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 flex justify-center items-center">
            <div className="max-w-xl w-full p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Update Concert</h2>
                <form className="mt-10">

                    <div className="mb-4">
                        <label className="block text-gray-600">Date</label>
                        <input
                            type="date"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Select Date"
                            value={concert?.date ? concert.date.split('T')[0] : ''}
                            onChange={handleDate}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600">Time</label>
                        <input
                            type="text"
                            name="time"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Enter Time"
                            value={concert?.time}
                            onChange={handleTime}
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-600">Venue</label>
                        <select
                            name="venue"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Select Venue"
                            value={concert?.venueId || ''}
                            onChange={handleVenue}
                        >
                            {venues.map((venue) => (
                                <option key={venue.id} value={venue.id}>
                                    {venue.name}
                                </option>
                            ))}
                        </select>
                    </div>



                    <div className="mb-4">
                        <label className="block text-gray-600">Headlining Band</label>
                        <select
                            name="headliningBand"
                            className="mt-1 p-2 w-full border rounded-md"
                            placeholder="Select Headlining Band"
                            value={concert?.bandConcerts?.find(bc => bc?.band?.isHeadliner)?.bandId || 0}
                            onChange={handleHeadliner}

                        >
                            <option value="0">Choose a band</option>
                            {headliningBands.map((headliner) => (
                                <option key={headliner.id} value={headliner.id}>
                                    {headliner.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Supporting Bands Checkboxes */}
                    <div className="mb-4">
                        <label className="block text-gray-600">Supporting Bands</label>
                        <div>
                            {supportingBands.map((supportingBand) => (
                                <label key={supportingBand.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="supportingsupportingBands"
                                        value={supportingBand.id}
                                        className="mr-2"
                                        checked={concert?.bandConcerts?.some(bc => bc.bandId === supportingBand.id)}
                                        onChange={handleCheckboxes}
                                    />
                                    {supportingBand.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>

                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-5"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );

}

