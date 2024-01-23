import { useEffect, useState } from "react"
import { getAllBandsWithMembers } from "../../managers/BandManager"
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from 'reactstrap'
import { Navigate, useNavigate } from "react-router-dom"




export const AllBands = () => {

    const navigate = useNavigate()

    const [allBands, setAllBands] = useState([])

    const handleGetBands = () => {
        getAllBandsWithMembers().then(setAllBands)
    }

    useEffect(() => {
        handleGetBands()
    }, [])

    return (
        <div className="flex flex-wrap justify-around">
            {allBands.map((band) => (
                <Card
                    key={band.id}
                    className="w-1/5 p-4 mb-4, mt-4 ml-4 mr-4"
                >
                   <img
    alt="Sample"
    src="./LunarEssence.png"
    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
/>


                    <CardBody className="flex flex-col items-center">

                        <CardTitle className="text-2xl mt-3 mb-3 tracking-wider">

                            {band.name}

                        </CardTitle>

                        <Button
                        onClick={() => navigate(`${band.id}`)}>
                            More Info
                        </Button>
                    </CardBody>
                </Card>
            ))}
        </div>
    );

}