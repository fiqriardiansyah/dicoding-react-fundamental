import React from "react";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import utils from "../utils";

import Navbar from "../components/navbar";
import FormNote from "../components/form-note";

function AddNotePage({ setNotes }) {
    const navigate = useNavigate();
    const newNoteHandler = (note) => {
        setNotes((prev) => utils.addNote(note, prev));
        navigate("/");
    };

    return (
        <div className="layout flex flex-col">
            <Navbar href="/" title="Add new note" />
            <FormNote onSubmitHandler={newNoteHandler} />
        </div>
    );
}

AddNotePage.propTypes = {
    setNotes: PropTypes.func.isRequired,
};

export default AddNotePage;
