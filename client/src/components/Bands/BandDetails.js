import { getBandById } from "../../managers/BandManager";
import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { FaEllipsisH } from "react-icons/fa";

export const BandDetails = ({ bandObj }) => {
  const [band, setBand] = useState({});
  const [modal, setModal] = useState(false);

  const handleGetIncomingBand = (bandObj) => {
    getBandById(bandObj.id).then(setBand);
  };
  const handleDeleteBand = () => {
    band && console.log(band.Id);
    // deleteBand(bandObj.Id)
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    handleGetIncomingBand(bandObj);
  }, [bandObj]);

  console.log(band);

  return (
    <div>
      <div className="cursor-pointer text-2xl" onClick={toggleModal}>
        <FaEllipsisH />
      </div>
      <Modal isOpen={modal} toggle={toggleModal} className="modal-lg">
        {/* <ModalHeader toggle={toggleModal} className="bg-slate-200">{band.name}</ModalHeader> */}
        <ModalBody className="relative bg-gradient-to-b from-slate-100 to-slate-300 rounded-lg transparent">
          <div
            className="absolute inset-10 bg-center bg-no-repeat mt-10"
            style={{
              backgroundImage: `url(${band.img})`,
              opacity: "0.2",
              backgroundSize: "110%",
              borderRadius: "10px",
            }}
          />

          <div className="relative z-10 p-7 font-sans text-gray-900">
            <div className="mb-6">
              {/* Genre */}
              <div className="mb-3">
                <p className="text-lg mb-2">
                  <span className="font-semibold text-xl text-blue-500">
                    Genre:
                  </span>
                  <span className="ml-2 text-xl font-bold">{band.genre}</span>
                </p>
              </div>
              {/* Bio */}
              <div className="mb-3">
                <p className="text-lg mb-2">
                  <span className="font-semibold text-xl text-blue-500">
                    Bio:
                  </span>
                </p>
                <p className="text-lg text-gray-800">{band.bio}</p>
              </div>

              {band.bandMembers && band.bandMembers.length > 0 ? (
                <div className="mb-4">
                  <p className="text-lg mb-2">
                    <span className="font-semibold text-xl text-blue-500">
                      Band Members:
                    </span>
                  </p>
                  <ul className="list-disc pl-6">
                    {band.bandMembers.map((member) => (
                      <li key={member.id} className="mb-2">
                        <p className="text-lg font-semibold">{member.name}</p>
                        <p className="text-md text-gray-800">
                          <span className="font-semibold">Instrument: </span>
                          {member.instrument}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-lg text-gray-800 mb-4">
                  No band members available
                </p>
              )}

              <div>
                <p className="text-lg mb-2">
                  <span className="font-semibold text-xl text-blue-500">
                    Upcoming Schedule:
                  </span>
                </p>
                {band.bandConcerts && band.bandConcerts.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {band.bandConcerts
                      .filter(
                        (bandConcert) =>
                          new Date(bandConcert.concert.date) >= new Date()
                      )
                      .map((bandConcert) => (
                        <li key={bandConcert.id} className="mb-2">
                          <p className="text-lg font-semibold">
                            {bandConcert.concert.venue.name}
                          </p>
                          <p className="text-md text-gray-800">
                            <span className="font-semibold">Date: </span>
                            {new Date(
                              bandConcert.concert.date
                            ).toLocaleDateString()}
                          </p>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-lg text-gray-800">No upcoming concerts</p>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        {/* <ModalFooter>
        <Button color="danger" onClick={toggleModal}>
          Close
        </Button>
      </ModalFooter> */}
      </Modal>
    </div>
  );
};


