import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { newVenue } from "../../managers/VenueManager";
import PropTypes from 'prop-types';
import { FaPlus } from "react-icons/fa";

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
                <ModalHeader toggle={toggle}>Add Venue</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-600">Name</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                value={venue.name || ""}
                                onChange={handleVenueName}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Address</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                value={venue.address || ""}
                                onChange={handleVenueAddress}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Phone Number</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                value={venue.phoneNumber || ""}
                                onChange={handlePhoneNumber}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600">Capacity</label>
                            <input
                                type="text"
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                                value={venue.capacity || ""}
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
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

AddVenue.propTypes = {
    handleVenues: PropTypes.func,
};
