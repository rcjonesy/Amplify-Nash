import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export const VenueMap = ({ isOpen, toggle, venue }) => { // Receive venue data as props

    const [modal, setModal] = useState(isOpen); // Set initial modal state to isOpen prop

    const mapStyles = {
        height: "100vh",
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    };

    const defaultCenter = {
        lat: 36.15161,
        lng: -86.80422,
    };




    const closeModal = () => {
        setModal(false); // Close the modal when requested
        toggle(); // Call the toggle function to update the state in the parent component
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={closeModal} size='lg'> {/* Use local modal state */}
                <ModalHeader className='bg-slate-100' toggle={closeModal}>{venue.name}</ModalHeader> {/* Render venue name in the header */}
                <ModalBody className='bg-neutral-800'>


                    <LoadScript googleMapsApiKey="">
                        <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
                            <Marker position={defaultCenter} />
                        </GoogleMap>
                    </LoadScript>

                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={closeModal}>
                        Do Something
                    </Button>{' '}
                    <Button color="secondary" onClick={closeModal}>
                        Cancel
                    </Button> */}
                </ModalFooter>
            </Modal>
        </div>
    );
};



