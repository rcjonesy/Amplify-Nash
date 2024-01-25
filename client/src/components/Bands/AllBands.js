import { useEffect, useState } from "react"
import { getAllBandsWithMembers, deleteBand } from "../../managers/BandManager"
import { Card, CardBody, CardTitle, Button } from 'reactstrap'

import { BandDetails } from "./BandDetails"




export const AllBands = () => {

    // const navigate = useNavigate()

    const [allBands, setAllBands] = useState([])

    const handleGetBands = () => {
        getAllBandsWithMembers().then(setAllBands)
    }

    const handleDeleteBand = (bandId) => {
        deleteBand(bandId)
            .then(() => {
                handleGetBands();
            })
    };

    useEffect(() => {
        handleGetBands()
    }, [])

    return (
        <div className="bg-black">
            <div className="flex flex-wrap justify-around">
                {allBands.map((band) => (
                    <div key={band.id} className="w-1/5 p-4 mb-4 mt-4 ml-4 mr-4 hover:scale-105">
                        <Card className="w-full h-full">
                            <img
                                alt="Sample"
                                src="./LunarEssence.png"
                                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                            />

                            <CardBody className="flex flex-col items-center">
                                <CardTitle className="text-2xl mt-3 mb-3 tracking-wider">
                                    {band.name}
                                </CardTitle>

                                <div className="flex flex-col items-center">
                                    <BandDetails bandObj={band} />

                                    <Button
                                        color="danger"
                                        className="mt-2"
                                        onClick={() => handleDeleteBand(band.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );

}