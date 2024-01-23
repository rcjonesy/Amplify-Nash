import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { getAllConcerts, deleteConcert } from "../../managers/ConcertManager";
import "../../background.css";

export const Home = () => {
    const [concerts, setConcerts] = useState();
    const navigate = useNavigate();

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
        <div className="flex flex-wrap justify-center items-start min-h-screen bg-black bg-opacity-50">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 bg-opacity-50">
                <Table responsive striped bordered hover dark>
                    <thead className="text-lg uppercase">
                        <tr>
                            <th className="px-6 py-4 text-center">Date</th>
                            <th className="px-6 py-4 text-center">Time</th>
                            <th className="px-6 py-4 text-center">Venue</th>
                            <th className="px-6 py-4 text-center">Headlining Artist</th>
                            <th className="px-6 py-4 text-center">Supporting Artist(s)</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {concerts &&
                            concerts.map((concert, index) => (
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



                                    <td className="align-middle">
                                        <Button
                                            color="primary"
                                            onClick={() => handleMakeChangeClick(concert.id)}
                                        >
                                            Make Changes
                                        </Button>
                                    </td>
                                    <td className="text-righ align-middle">
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
