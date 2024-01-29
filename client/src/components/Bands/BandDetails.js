import { getBandById } from "../../managers/BandManager";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FaEllipsisH } from "react-icons/fa";

export const BandDetails = ({ bandObj }) => {

  const [band, setBand] = useState({});
  const [modal, setModal] = useState(false);

  const handleGetIncomingBand = (bandObj) => {
    getBandById(bandObj.id).then(setBand);
  };
  const handleDeleteBand = () => {
    band && console.log(band.Id)
    // deleteBand(bandObj.Id)
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    handleGetIncomingBand(bandObj);
  }, [bandObj]);



  return (
    <div>

      <div className="cursor-pointer text-2xl" onClick={toggleModal}>
        <FaEllipsisH />
      </div>


      <Modal isOpen={modal} toggle={toggleModal} className="modal-lg">
        <ModalHeader toggle={toggleModal} className="bg-slate-200">{band.name}</ModalHeader>
        <ModalBody className="bg-slate-100">
          
          <div className="mb-2">
            <p className="text-lg mb-1"><span className="font-semibold text-xl">Genre:</span></p>
            <p className="text-sm">-{band.genre}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg mb-1"><span className="font-semibold text-xl">Bio:</span></p>
            <p className="text-sm">-{band.bio}</p>
          </div>
          {band.bandMembers && band.bandMembers.length > 0 ? (
            <div>
              <p className="text-sm font-semibold">Band Members:</p>
              <ul className="list-disc pl-4">
                {band.bandMembers.map((member) => (
                  <li key={member.id} className="mb-2">
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-sm"><span className="font-semibold">-</span> {member.instrument}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-sm mb-3">No band members available</p>
          )}
          <div>
            <p className="text-sm font-semibold">Upcoming Schedule:</p>
            {band.bandConcerts && band.bandConcerts.length > 0 ? (
              <ul className="list-disc pl-4">
                {band.bandConcerts.map((bandConcert) => (
                  <li key={bandConcert.id} className="mb-2">
                    <p className="text-sm"><span className="font-semibold">Venue:</span> {bandConcert.concert.venue.name}</p>
                    <p className="text-sm"><span className="font-semibold">Date:</span> {new Date(bandConcert.concert.date).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm mb-3">No upcoming concerts</p>
            )}
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
