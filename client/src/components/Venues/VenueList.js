import React, { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import { getAllVenues, deleteVenue } from "../../managers/VenueManager";
import { useNavigate } from "react-router-dom";
import { AddVenue } from "./AddVenue";

export const VenueList = () => {
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);

    const handleVenues = () => {
        getAllVenues().then(setVenues);
    };

    useEffect(() => {
        handleVenues();
    }, []);

    const handleRemoveVenue = (venueId) => {
        deleteVenue(venueId).then(() => {
            handleVenues();
        });
    };

    return (
        <div className="min-h-screen bg-black p-4 flex flex-col items-center">
            <div className="flex justify-around w-full mt-10 min-h-screen">
                <div className="w-3/4 max-h-97 overflow-y-auto mr-4 mt-4">
                    <Table responsive striped bordered hover dark className="">
                        <thead className="text-lg text-gray-700 uppercase bg-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-center">Name</th>
                                <th className="px-6 py-4 text-center">Address</th>
                                <th className="px-6 py-4 text-center">Phone</th>
                                <th className="px-6 py-4 text-center">Capacity</th>
                                <th className="px-6 py-4 text-center">
                                    <div className="w-full max-w-md mr-10">
                                        <AddVenue handleVenues={handleVenues} />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {venues &&
                                venues.map((venue, index) => (
                                    <tr
                                        key={venue.id}
                                        className={
                                            index % 2 === 0
                                                ? "bg-white"
                                                : "bg-slate-200 border-b hover:bg-gray-50"
                                        }
                                    >
                                        <td className="px-6 py-4 text-lg text-center">{venue.name}</td>
                                        <td className="px-6 py-4 text-lg text-center">{venue.address}</td>
                                        <td className="px-6 py-4 text-lg text-center">{venue.phoneNumber}</td>
                                        <td className="px-6 py-4 text-lg text-center">{venue.capacity}</td>
                                        <td className="px-6 py-4 flex items-center text-center">
                                            <Button
                                                color="danger"
                                                onClick={() => handleRemoveVenue(venue.id)}
                                                className="m-auto" // Added class to center vertically
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
