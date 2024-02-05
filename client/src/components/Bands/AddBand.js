import React, { useState } from "react";
import { postNewBand } from "../../managers/BandManager";
import { useNavigate } from "react-router-dom";






export const AddBand = () => {

    const navigate = useNavigate()

    const [newBand, setNewBand] = useState({
        name: "",
        genre: "",
        bio: "",
        img: "",
        isHeadliner: false,
        bandMembers: [
            {
                name: "",
                instrument: ""
            }
        ]
    });

    const handleToggle = () => {
        setNewBand({
            ...newBand,
            isHeadliner: !newBand.isHeadliner
        });
    };

    const handleName = (event) => {
        setNewBand({
            ...newBand,
            name: event.target.value
        });
    };

    const handleGenre = (event) => {
        setNewBand({
            ...newBand,
            genre: event.target.value
        });
    };

    const handleBio = (event) => {
        setNewBand({
            ...newBand,
            bio: event.target.value
        });
    };

    const handleImg = (event) => {
        setNewBand({
            ...newBand,
            img: event.target.value
        })
    }

    const handleMemberName = (event, index) => {
        const newMember = [...newBand.bandMembers];
        newMember[index].name = event.target.value;
        setNewBand({
            ...newBand,
            bandMembers: newMember
        });
    };

    const handleInstrument = (event, index) => {
        const newMemberInstrument = [...newBand.bandMembers];
        newMemberInstrument[index].instrument = event.target.value;
        setNewBand({
            ...newBand,
            bandMembers: newMemberInstrument
        });
    };


    const addMember = () => {
        setNewBand({
            ...newBand,
            bandMembers: [
                ...newBand.bandMembers,
                {
                    name: "",
                    instrument: ""
                }
            ]
        });
    };

    const sendToDatabase = (event) => {
        event.preventDefault();

        postNewBand(newBand).then(() => {

            navigate("/bands");
        });
    };

    const handleCancel = (event) => {
        navigate("/bands")
    }

    const renderMemberFields = () => {
        return newBand.bandMembers.map((member, index) => (
            <div key={index} className="flex">
                <div className="flex-grow">
                    <label className="block text-gray-600">Band Member {index + 1}</label>
                    <input
                        type="text"
                        placeholder="add member"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        value={member.name}
                        onChange={(event) => handleMemberName(event, index)}
                    />
                </div>

                <div className="ml-4">
                    <label className="block text-gray-600">Instrument</label>
                    <input
                        type="text"
                        placeholder="add instrument"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        value={member.instrument}
                        onChange={(event) => handleInstrument(event, index)}
                    />
                </div>
            </div>
        ));
    };


    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-neutral-950 to-neutral-900">

            <form className="p-5 max-w-xl b-full border bg-white transparent rounded-md">
                
                <div className="mb-4">
                    <label className="block text-gray-600 ">Band Name</label>
                    <input
                        placeholder="band name"
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        onChange={handleName}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Genre</label>
                    <input
                        placeholder="genre"
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        onChange={handleGenre}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Bio</label>
                    <textarea
                        placeholder="biography"
                        className="mt-1 p-2 w-full h-40 border rounded-md"
                        required
                        onChange={handleBio}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600">Image</label>
                    <input
                        placeholder="./New.png"
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                        onChange={handleImg}
                    />
                </div>

                {renderMemberFields()}

                <button
                    type="button"
                    className="bg-gray-500 hover:bg-blue-700 text-white py-1 px-1 rounded mb-4 mt-3"
                    onClick={addMember}
                >
                    Add Member
                </button>

                <div className="mb-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={handleToggle}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300  after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-black">Headliner?</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    onClick={sendToDatabase}
                >
                    Submit
                </button>

                <button
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded ml-5"
                    onClick={handleCancel}
                >
                    Cancel
                </button>

            </form>
        </div>
    );
};
