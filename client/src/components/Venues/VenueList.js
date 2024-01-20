import { useState, useEffect } from "react";
import { getAllVenues } from "../../managers/VenueManager";
import { deleteVenue } from "../../managers/VenueManager";
import { useNavigate } from "react-router-dom";
import { AddVenue } from "./AddVenue";



export const VenueList = () => {



    const navigate = useNavigate()

    const [venues, setVenues] = useState([])

    const handleVenues = () => {
        getAllVenues().then(setVenues)
    }

    useEffect(() => {
        handleVenues()
    }, [])

    const handleRemoveVenue = (venueId) => {
        deleteVenue(venueId).then(() => {

            handleVenues();
        });
    };



    return (
        <div className="min-h-screen bg-black p-4 flex flex-col items-center">
            <div className="flex justify-around w-full mt-10">
                <div className="w-1/2 max-w-screen-lg overflow-x-auto mr-4 mt-4">
                <table className="w-full text-base text-left text-gray-500 bg-slate-600 rounded-sm outline border-t shadow-md border-transparent">
                        <thead className="text-lg text-gray-700 uppercase bg-slate-200">
                            <tr>
                                <th scope="col" className="px-8 py-2">
                                    Name
                                </th>
                                <th scope="col" className="px-8 py-2">
                                    Address
                                </th>
                                <th scope="col" className="px-8 py-2">
                                    Phone
                                </th>
                                <th scope="col" className="px-8 py-2">
                                    Capacity
                                </th>
                                <th scope="col" className="px-8 py-2">

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
                                        <td className="px-10 py-4 w-1/4">{venue.name}</td>
                                        <td className="px-8 py-4 w-1/2">{venue.address}</td>
                                        <td className="px-8 py-4 w-1/2">{venue.phoneNumber}</td>
                                        <td className="px-8 py-4 w-1/3">{venue.capacity}</td>
                                        <td className="px-8 py-4 w-1/2 text-right">
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                                                onClick={() => handleRemoveVenue(venue.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full max-w-md mr-10">
                    <AddVenue handleVenues={handleVenues} />
                </div>
            </div>
        </div>
    );
}