import { getAllConcerts, deleteConcert } from "../../managers/ConcertManager"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




export const Home = () => {

    const [concerts, setConcerts] = useState()

    const handleGetConcerts = () => {
        getAllConcerts().then(setConcerts);
    };

    const navigate = useNavigate()

    useEffect(() => {
        handleGetConcerts();
    }, []);

    const handleDeleteConcert = (concertId) => {
        deleteConcert(concertId).then(handleGetConcerts(setConcerts))
    }

    const handleMakeChangeClick = (concertId) => {
        navigate(`/concert/${concertId}`)
    }


    return (
        <div className="flex flex-wrap justify-center items-start min-h-screen">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
                <table className="w-full text-base text-left rtl:text-right text-gray-500 bg-slate-600">
                    <thead className="text-lg text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-2">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Venue
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Headlining Artist
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Supporting Artist(s)
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Tickets Sold
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Tickets Available
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Make Changes
                            </th>
                            <th scope="col" className="px-6 py-2">
                                Cancel Event
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {concerts &&
                            concerts.map((concert, index) => (
                                <tr key={concert.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100 border-b hover:bg-gray-50'}>
                                    <td className="px-6 py-4">
                                        {new Date(concert.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4">{concert.venue.name}</td>
                                    <td className="px-6 py-4">
                                        {concert.bandConcerts.find((bc) => bc.band.isHeadliner === true)?.band.name || "No headlining band"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <ul>
                                            {concert.bandConcerts.map((bc) => (
                                                <li key={bc.band.id}>
                                                    {bc.band.isHeadliner === false ? bc.band.name : null}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="text-center">
                                        {concert.ticketsSold}
                                    </td>
                                    <td className="text-center">
                                        {concert.ticketsAvailable}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                                            onClick={() => handleMakeChangeClick(concert.id)}
                                        >
                                            Make Changes
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                                            onClick={() => handleDeleteConcert(concert.id)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}