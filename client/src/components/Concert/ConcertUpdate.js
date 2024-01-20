import { getConcertById } from "../../managers/ConcertManager"
import { getHeadliningBands, getSupportingBands } from "../../managers/BandManager"
import { getAllVenues } from "../../managers/VenueManager"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Form, FormGroup, Label, Input, Button, Col, FormText } from 'reactstrap';



export const ConcertUpdate = () => {

    const { id } = useParams()
    const userId = id * 1



    const [concert, setConcert] = useState({})
    const [headliners, setHeadliners] = useState([])
    const [supporting, setSupporting] = useState([])
    const [venues, setVenues] = useState([])
    const [newConcert, setNewConcert] = useState({});
    const [newHeadliner, setNewHeadliner] = useState({})
    const [newSupporting, setNewSupporting] = useState([])

    //splitting up headlining band and split up supporting bands into 2 different states

    const handleGetConcert = (id) => {
        getConcertById(id).then((data) => {
            setConcert(data)
            setNewConcert(data)
            const headliner = data.bandConcerts.find((bc) => bc.band.isHeadliner === true).bandId
            const supportingBands = data.bandConcerts.filter((bc) => bc.band.isHeadliner === false)

            setNewHeadliner({ bandId: headliner })
            setNewSupporting(supportingBands)
        })
    }

    const handleGetHeadliners = () => {
        getHeadliningBands().then(setHeadliners)
    }

    const handleGetSupporting = () => {
        getSupportingBands().then(setSupporting)
    }

    const handleGetVenues = () => {
        getAllVenues().then(setVenues)
    }

    const handleChosenDate = (event) => {
        console.log(event.target.value)
        setNewConcert({ ...newConcert, date: event.target.value })
    }

    const handleChosenVenue = (event) => {
        setNewConcert({ ...newConcert, venueId: event.target.value })
    }

    const handleChosenHeadliner = (event) => {
        setNewHeadliner({ bandId: event.target.value })
        const copy = { ...newConcert }
        copy.bandConcerts = copy.bandConcerts.filter((bc) => bc.band.isHeadliner !== true)
        copy.bandConcerts.push({ bandId: event.target.value * 1 })
        setNewConcert(copy)
    }


    const handleChosenSupporting = (event) => {

        if (event.target.checked) {

            const copy = [...newSupporting]
            copy.push({ bandId: event.target.value * 1 })
            setNewSupporting(copy)

        } else {
            const copy = newSupporting.filter((ns) => ns.bandId !== event.target.value * 1)
            setNewSupporting(copy)
        }

    }

    //check if box is checked or not
    //if it's checked remove checked band from array
    //if it's not checked add the checked band to the array


    useEffect(() => {
        handleGetConcert(userId)
        handleGetHeadliners()
        handleGetSupporting()
        handleGetVenues()
    }, [])

    const formatDate = (dateString) => {
        
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits for month
        let day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for day

        return `${year}-${month}-${day}`;
    };




    return (
        <Form className="max-w-2xl mx-auto mt-8 p-6 bg-gray-200 shadow-md rounded">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Update Concert</h2>

            <div className="mb-4">
                <Label for="datePicker" className="block text-lg font-semibold text-gray-700 mb-2">
                    Select Date
                </Label>
                <Input
                    type="date"
                    id="datePicker"
                    value={newConcert?.date || formatDate(concert.date)}
                    className="p-3 border rounded w-full"
                    onChange={handleChosenDate}
                />
            </div>

            <div className="mb-4">
                <Label for="venueSelect" className="block text-lg font-semibold text-gray-700 mb-2">
                    Select Venue
                </Label>
                <Input
                    id="venueSelect"
                    type="select"
                    value={newConcert.venueId || (concert && concert.venue && concert.venue.id)}
                    className="p-3 border rounded w-full"
                    onChange={handleChosenVenue}
                >
                    <option value="">Select a venue</option>
                    {venues && venues.map((venue) => (
                        <option key={venue.id} value={venue.id}>
                            {venue.name}
                        </option>
                    ))}
                </Input>
            </div>

            <div className="mb-4">
                <Label for="headlinerSelect" className="block text-lg font-semibold text-gray-700 mb-2">
                    Select Headliner
                </Label>
                <Input
                    id="headlinerSelect"
                    type="select"
                    value={(newConcert.bandConcerts && newConcert.bandConcerts.length > 0)
                        ? newConcert.bandConcerts[0].bandId
                        : (concert && concert.bandConcerts?.find(bc => bc.band.isHeadliner === true)?.band?.id) || ""}
                    className="p-3 border rounded w-full"
                    onChange={handleChosenHeadliner}
                >
                    <option value="">Select a headliner</option>
                    {headliners && headliners.map((headliner) => (
                        <option key={headliner?.id} value={headliner.id}>
                            {headliner.name}
                        </option>
                    ))}
                </Input>
            </div>

            <div className="mb-4">
                <Label className="block text-lg font-semibold text-gray-700 mb-2">
                    Select Supporting Bands
                </Label>
                <div className="flex flex-col space-y-2">
                    {supporting && supporting.map((band) => (
                        <div key={band.id} className="flex items-center">
                            <Input
                                id={`checkbox-${band.id}`}
                                type="checkbox"
                                className="mr-2"
                                defaultChecked={concert && concert.bandConcerts?.some(bc => bc.bandId === band.id)}
                                onChange={handleChosenSupporting}
                                value={`${band.id}`}
                            />
                            <Label check htmlFor={`checkbox-${band.id}`} className="text-gray-700">
                                {band.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <Button className="bg-gray-700 text-white p-3 rounded hover:bg-gray-800 transition duration-300">
                    Submit
                </Button>
            </div>
        </Form>
    );
}