import { newVenue } from "../../managers/VenueManager"
import { useState } from "react"






export const AddVenue = ( { handleVenues } ) => {

    const [venue, setVenue] = useState({})

    const handleVenueName = (event) => {
        setVenue({ ...venue, name: event.target.value })
    }

    const handleVenueAddress = (event) => {
        setVenue({ ...venue, address: event.target.value })
    }

    const handlePhoneNumber = (event) => {
        setVenue({ ...venue, phoneNumber: event.target.value })
    }

    const handleCapacity = (event) => {
        setVenue({ ...venue, capacity: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        newVenue(venue).then(() => {
          // Clear the form fields after successful submission
          setVenue({
            name: "",
            address: "",
            phoneNumber: "",
            capacity: ""
          });
          // Refetch the venues
          handleVenues();
        });
     };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-sm shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add Venue</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label className="block text-gray-600">Name</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        value={venue.name || ""}
                        onChange={handleVenueName}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Address</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        value={venue.address || ""}
                        onChange={handleVenueAddress}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Phone Number</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        value={venue.phoneNumber || ""}
                        onChange={handlePhoneNumber}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Capacity</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        value={venue.capacity || ""}
                        onChange={handleCapacity}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}