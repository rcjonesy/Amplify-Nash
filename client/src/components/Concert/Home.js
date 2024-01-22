import { getAllConcerts, deleteConcert } from "../../managers/ConcertManager"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"





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
        <div className="flex flex-wrap justify-center items-start min-h-screen bg-black">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
                <table className="w-full text-base text-left rtl:text-right text-gray-500 bg-slate-200">
                    <thead className="text-lg text-gray-700 uppercase bg-slate-200">
                        <tr>
                            <th scope="col" className="px-10 py-8">
                                Date
                            </th>
                            <th scope="col" className="px-10 py-8">
                                Time
                            </th>
                            <th scope="col" className="px-10 py-8">
                                Venue
                            </th>
                            <th scope="col" className="px-10 py-8">
                                Headlining Artist
                            </th>
                            <th scope="col" className="px-10 py-8">
                                Supporting Artist(s)
                            </th>
                            <th scope="col" className="px-10 py-8">
                            </th>
                            <th scope="col" className="px-10 py-8">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {concerts &&
                            concerts.map((concert, index) => (
                                <tr key={concert.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-200 border-b hover:bg-slate-100'}>
                                    <td className="px-10 py-8">
                                        {new Date(concert.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="px-10 py-8">
                                        {concert.time} PM
                                    </td>
                                    <td className="px-10 py-8">{concert.venue.name}</td>
                                    <td className="px-10 py-8">
                                        {concert.bandConcerts.find((bc) => bc.band.isHeadliner === true)?.band.name || "No headlining band"}
                                    </td>
                                    <td className="px-10 py-8">
                                        <ul className="mt-3 pl-0 list-none">
                                            {concert.bandConcerts.map((bc) => (
                                                <li key={bc.band.id} className="flex items-start">
                                                    {bc.band.isHeadliner === false ? bc.band.name : null}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <Button color="primary"
                                            onClick={() => handleMakeChangeClick(concert.id)}
                                        >
                                            Make Changes
                                        </Button>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <Button color="danger"
                                            onClick={() => handleDeleteConcert(concert.id)}
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
}