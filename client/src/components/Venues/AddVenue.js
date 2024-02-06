import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { newVenue } from "../../managers/VenueManager";
import PropTypes from 'prop-types';


export const AddVenue = ({ handleVenues }) => {
    const [venue, setVenue] = useState({});
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleVenueName = (event) => {
        setVenue({ ...venue, name: event.target.value });
    }

    const handleVenueAddress = (event) => {
        setVenue({ ...venue, address: event.target.value });
    }

    const handlePhoneNumber = (event) => {
        setVenue({ ...venue, phoneNumber: event.target.value });
    }

    const handleCapacity = (event) => {
        setVenue({ ...venue, capacity: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        newVenue(venue).then(() => {
            // Clear the form fields after successful submission
            setVenue({
                name: "",
                address: "",
                phoneNumber: "",
                capacity: ""
            });
            // Refetch the venues
            handleVenues();
            // Close the modal
            toggle();
        });
    };

    return (
        <div>
            <Button onClick={toggle} color='primary' className="backdrop-blur-60 ml-5 bg-blue-500 mr-6 mt-2">
            Add Venue
            </Button>
            <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered">
                
                <ModalBody className='bg-gradient-to-br from-neutral-700 to-neutral-700'>
                    <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
                        <p className='text-white text-xl'>Add Venue</p>
                        <div className="mb-4">
                            <label className="block text-white">Name</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                value={venue.name || ""}
                                placeholder='Name'
                                onChange={handleVenueName}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white">Address</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                value={venue.address || ""}
                                placeholder='Address'
                                onChange={handleVenueAddress}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white">Phone Number</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                value={venue.phoneNumber || ""}
                                placeholder='Phone Number'
                                onChange={handlePhoneNumber}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white">Capacity</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                value={venue.capacity || ""}
                                placeholder='Capacity'
                                onChange={handleCapacity}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>
                </ModalBody>
                {/* <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter> */}
            </Modal>
        </div>
    );
}

AddVenue.propTypes = {
    handleVenues: PropTypes.func,
};
