import { useEffect, useState } from "react"
import { getAllBandsWithMembers, deleteBand } from "../../managers/BandManager"
import { MdDelete } from "react-icons/md";
import { BandDetails } from "./BandDetails"
import { MoonLoader } from "react-spinners";






export const AllBands = ({ loggedInUser }) => {



  const [allBands, setAllBands] = useState([])
  const [filteredBands, setFilteredBands] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const handleGetBands = () => {
    setLoading(true); // Set loading to true before starting the API call

    getAllBandsWithMembers()
      .then((bandsData) => {
        setAllBands(bandsData);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API call is completed (whether it succeeds or fails)
      });
  };


  const handleDeleteBand = (bandId) => {
    deleteBand(bandId)
      .then(() => {
        handleGetBands();
      })
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(
    () => {
      const genreFilter = allBands.filter(band =>
        band.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBands(genreFilter);
    },
    [allBands, searchTerm]
  );

  useEffect(() => {
    handleGetBands()
  }, [])

  return (
    <div
      className="bg-gradient-to-br from-neutral-950 to-neutral-900 min-h-screen p-4"
    >
      <div className="flex justify-center w-full px-4">
        <input
          type="text"
          className="p-2 mt-5 mb-4 rounded-md w-1/6 bg-slate-50"
          placeholder="search by genre..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <MoonLoader color="#FFFFFF" size={50} />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {filteredBands.map((band) => (
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