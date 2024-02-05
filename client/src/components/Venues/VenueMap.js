import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export const VenueMap = ({ isOpen, toggle, venue }) => {

    const [modal, setModal] = useState(isOpen);
    const [center, setCenter] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyC40LSG_eBPlG_7VWYDfHKJbRAGLSXd8G4"
    });

    const mapStyles = {
        height: "80vh",
        width: "100%",
        
    };
    


    const closeModal = () => {
        setModal(false);
        toggle();
    };

    const handleGeo = () => {
        if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {

            return;
        }

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: venue.address }, (results, status) => {
            if (status === "OK" && results.length > 0) {
                const { lat, lng } = results[0].geometry.location;
                setCenter({ lat: lat(), lng: lng() });
            }
        });
    }




    useEffect(() => {
        if (isLoaded) {
            handleGeo();
        }
    }, [isLoaded, venue.address]);

    if (loadError) {
        return <div>Error loading Google Maps: {loadError}</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={closeModal} size='lg' style={{ marginTop: "10vh" }} >
                <ModalHeader className='bg-slate-100' toggle={closeModal}>{venue.name}</ModalHeader>
                <ModalBody className='bg-slate-100'>



                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={13} center={center}
                        // options={{styles: nightModeMapStyles}}
                    >
                        {center && <Marker position={center} />}
                    </GoogleMap>


                </ModalBody>
                {/* <ModalFooter> */}

                {/* </ModalFooter> */}
            </Modal>
        </div>
    );
};
