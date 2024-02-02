import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { getAllVenues, deleteVenue } from "../../managers/VenueManager";
import { AddVenue } from "./AddVenue";
import { VenueMap } from "./VenueMap";






export const VenueList = () => {

    const [venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredVenues, setFilteredVenues] = useState([])

    const handleVenues = () => {
        getAllVenues().then(setVenues);
    };

    useEffect(() => {
        handleVenues();
    }, []);


    useEffect(
        () => {
            const foundVenues = venues.filter(venue =>
                venue.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredVenues(foundVenues);
        },
        [venues, searchTerm]
    );

    const handleRemoveVenue = (venueId) => {
        deleteVenue(venueId).then(() => {
            handleVenues();
        });
    };

    const handleClickVenue = (venue) => {
        setSelectedVenue(venue)
    }

    const handleCloseModal = () => {
        setSelectedVenue(null); // Reset the selected venue to close the modal
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 p-4 flex flex-col items-center">
            <div className="flex justify-center w-full px-4">
                <input
                    type="text"
                    className="p-2 mt-5 mb-4 rounded-md w-1/6 bg-slate-50"
                    placeholder="search by venue name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="flex justify-around w-full mt-10 min-h-screen">

                <div className="w-3/4 max-h-97 overflow-y-auto mr-4 sm:rounded-lg">
                    <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg">
                        <thead className="text-lg text-gray-900 uppercase bg-slate-200">
                            <tr>
                                <th className="px-6 py-10 text-center text-xl">Name</th>
                                <th className="px-6 py-10 text-center text-xl">Address</th>
                                <th className="px-6 py-10 text-center text-xl">Phone</th>
                                <th className="px-6 py-10 text-center text-xl">Capacity</th>
                                <th className="px-6 py-10 text-center text-xl">
                                    <div className="w-full max-w-md">
                                        <AddVenue handleVenues={handleVenues} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {venues &&
                                filteredVenues.map((venue, index) => (
                                    <tr
                                        key={venue.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-slate-200 hover:bg-gray-50"}
                                    >
                                        <td className="px-6 py-4 text-lg text-center">{venue.name}</td>
                                        <td
                                            className="px-6 py-4 text-lg text-center cursor-pointer hover:text-blue-500 flex items-center justify-center"
                                            onClick={() => handleClickVenue(venue)}
                                        >
                                            {venue.address}
                                            <img src="./map-icon.png" alt="Map Pin" className="w-6 h-6 ml-4" />
                                        </td>
                                        <td className="px-6 py-4 text-lg text-center">{venue.phoneNumber}</td>
                                        <td className="px-6 py-4 text-lg text-center">{venue.capacity}</td>
                                        <td className="px-6 py-4 text-lg text-center">
                                            <Button
                                                color="danger"
                                                onClick={() => handleRemoveVenue(venue.id)}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedVenue && <VenueMap venue={selectedVenue} isOpen={true} toggle={handleCloseModal} />}
        </div>
    );
};
