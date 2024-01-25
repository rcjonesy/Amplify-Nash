import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Badge } from "reactstrap";
import { getAllConcerts, deleteConcert } from "../../managers/ConcertManager";

import "../../background.css";

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
        <div className="flex flex-wrap justify-center items-start min-h-screen bg-white bg-opacity-50">
            <input
                type="text"
                className="p-2 m-4 border rounded-md"
                placeholder="Search by venue or artist..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 bg-opacity-50 w-3/4">
                <Table responsive striped bordered hover dark>
                    <thead className="text-lg uppercase">
                        <tr>
                            <th className="px-6 py-4 text-center">Date</th>
                            <th className="px-6 py-4 text-center">Time</th>
                            <th className="px-6 py-4 text-center">Venue</th>
                            <th className="px-6 py-4 text-center">Headlining Artist</th>
                            <th className="px-6 py-4 text-center">Supporting Artist(s)</th>
                            <th className="px-6 py-4 text-center">Status</th>
                            <th>
                                
                            </th>
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
                                            : "bg-slate-200 border-b hover:bg-slate-100"
                                    }
                                >
                                    <td className="px-6 py-4 text-center text-lg align-middle">
                                        {new Date(concert.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                        })}
                                    </td>

                                    <td className="px-6 py-4 text-center text-lg align-middle">{concert.time} PM</td>
                                    <td className="px-6 py-4 text-center text-lg align-middle">{concert.venue.name}</td>
                                    <td className="px-6 py-4 text-center text-lg align-middle">
                                        {concert.bandConcerts.find(
                                            (bc) => bc.band.isHeadliner === true
                                        )?.band.name || "No headlining band"}
                                    </td>

                                    <td className="px-6 py-4 text-center text-lg">
                                        <ul className="pl-0 list-none flex flex-col items-center">
                                            {concert.bandConcerts.map((bc) => (
                                                <li key={bc.band.id}>{bc.band.isHeadliner === false ? bc.band.name : null}</li>
                                            ))}
                                        </ul>
                                    </td>

                                    <td className="text-center align-middle">
                                        {concert.bandConcerts.some((bc) => bc.band.isHeadliner) &&
                                            concert.bandConcerts.filter((bc) => !bc.band.isHeadliner).length >= 2 ?
                                            <Badge color="success">complete</Badge> :
                                            <Badge color="danger">incomplete</Badge>}
                                    </td>

                                    <td className="text-center align-middle">
                                        <Button
                                            color="primary"
                                            onClick={() => handleMakeChangeClick(concert.id)}
                                        >
                                            Make Changes
                                        </Button>
                                    </td>

                                    <td className="text-center align-middle">
                                        <Button
                                            color="danger"
                                            onClick={() => handleDeleteConcert(concert.id)}
                                        >
                                            Cancel
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </Table>
            </div>
        </div>
    );
};
