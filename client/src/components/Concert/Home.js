import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Badge } from "reactstrap";
import { getAllConcerts, deleteConcert } from "../../managers/ConcertManager";
import { FcHighPriority } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";


// import "../../background.css";

export const Home = () => {
    const [concerts, setConcerts] = useState([]);
    const [filteredConcerts, setFilteredConcerts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate();

    //================================================================
    // for search filter



    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    useEffect(() => {
        // Filter concerts based on venue name or any band name
        const foundConcerts = concerts?.filter((concert) => {
            // Check if the venue name matches the search term
            const venueMatches = concert?.venue?.name.toLowerCase().includes(searchTerm);

            // Filter the bandConcerts array to include only those with matching band names
            const bandMatches = concert?.bandConcerts.filter((bandConcert) =>
                bandConcert?.band?.name.toLowerCase().includes(searchTerm)
            );

            // Include the concert if either the venue or any band matches
            return venueMatches || bandMatches.length // Check if there are any matching bands
        })


        setFilteredConcerts(foundConcerts)
    }, [searchTerm, concerts])


    //================================================================


    const handleGetConcerts = () => {
        getAllConcerts().then(setConcerts);
    };

    useEffect(() => {
        handleGetConcerts();

    }, []);

    const handleDeleteConcert = (concertId) => {
        deleteConcert(concertId).then(() => handleGetConcerts());
    };

    const handleMakeChangeClick = (concertId) => {
        navigate(`/concert/${concertId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 to-neutral-900 p-4 flex flex-col items-center">
            <div className="flex justify-center w-full px-4">
                <input
                    type="text"
                    className="p-2 m-4 border rounded-md"
                    placeholder="Search by venue or artist..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 w-3/4">
                <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg">
                    <thead className="text-lg uppercase bg-slate-200">
                        <tr>
                            <th className="px-6 py-10 text-center text-xl">Date</th>
                            <th className="px-6 py-10 text-center text-xl">Time</th>
                            <th className="px-6 py-10 text-center text-xl">Venue</th>
                            <th className="px-6 py-10 text-center text-xl">Headlining Artist</th>
                            <th className="px-6 py-10 text-center text-xl">Supporting Artist(s)</th>
                            <th className="px-6 py-10 text-center text-xl">Status</th>
                            <th className="px-6 py-10" ></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {concerts &&
                            filteredConcerts.map((concert, index) => (
                                <tr
                                    key={concert.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-slate-200 hover:bg-gray-300"
                                    }
                                >
                                    <td className="px-6 py-4 text-center text-lg align-middle ">
                                        {new Date(concert.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-center text-lg align-middle ">{concert.time} PM</td>
                                    <td className="px-6 py-4 text-center text-lg align-middle ">{concert.venue.name}</td>
                                    <td className="px-6 py-4 text-center text-lg align-middle ">
                                        {concert.bandConcerts.find(
                                            (bc) => bc.band.isHeadliner === true
                                        )?.band.name || "No headlining band"}
                                    </td>
                                    <td className="px-6 py-4 text-center text-lg ">
                                        <ul className="pl-0 list-none flex flex-col items-center">
                                            {concert.bandConcerts.map((bc) => (
                                                <li key={bc.band.id}>{bc.band.isHeadliner === false ? bc.band.name : null}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="text-center align-middle ">
                                        {concert.bandConcerts.some((bc) => bc.band.isHeadliner) &&
                                            concert.bandConcerts.filter((bc) => !bc.band.isHeadliner).length >= 2 ?
                                            <span className=" text-green-500 text-3xl inline-block"><FcCheckmark />
                                            </span> :
                                            <span className="text-red-500 text-3xl inline-block"><FcHighPriority /></span>}
                                    </td>
                                    <td className="text-center align-middle">
                                        <Button
                                            color="primary"
                                            onClick={() => handleMakeChangeClick(concert.id)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                                        >
                                            Make Changes
                                        </Button>
                                    </td>
                                    <td className="text-center align-middle pr-6">
                                        <Button
                                            color="danger"
                                            onClick={() => handleDeleteConcert(concert.id)}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                                        >
                                            Cancel
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
