import { useEffect, useState } from "react"
import { getAllBandsWithMembers, deleteBand } from "../../managers/BandManager"
import { MdDelete } from "react-icons/md";
import { BandDetails } from "./BandDetails"
import { MoonLoader } from "react-spinners";





export const AllBands = () => {

    

    const [allBands, setAllBands] = useState([])
    const [loading, setLoading] = useState(true)

    const handleGetBands = () => {
        getAllBandsWithMembers().then(setAllBands)
        setLoading(false)
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
      <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 min-h-screen">
         {loading ? ( 
              <div className="flex justify-center items-center min-h-screen">
                  <MoonLoader color="#FFFFFF" size={50} />
              </div>
          ) : (
            <div className="flex flex-wrap justify-center">
              {allBands.map((band) => (
                <div key={band.id} className="relative w-1/5 p-8 mb-4 mt-10 ml-4 mr-4 hover:scale-105 transition">
                  <div className="bg-gray-50 shadow-lg relative rounded-md">
                    <div className="absolute top-0 right-0 p-3">
                      <BandDetails bandObj={band} />
                    </div>
                    <div className="flex flex-col">
                      <img
                        alt="Sample"
                        src={band.img}
                        className="max-w-full h-auto"
                      />
                      <div className="p-3">
                        <div className="text-lg font-semibold">{band.name}</div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 p-3">
                      <div
                        className="text-red-500 text-2xl cursor-pointer"
                        onClick={() => handleDeleteBand(band.id)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
  );
  
      
      
}