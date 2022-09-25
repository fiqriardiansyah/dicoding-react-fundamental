import React from "react";
import PropTypes from "prop-types";

import { useNavigate, useParams } from "react-router-dom";
import utils from "../utils";

import Navbar from "../components/navbar";
import FormNote from "../components/form-note";
import Empty from "../components/empty";

function EditNotePage({ setNotes, notes }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const newNoteHandler = (note) => {
        setNotes((prev) => utils.editNote({ id, ...note }, prev));
        navigate("/");
    };

    const note = notes.find((nt) => nt.id === id);

    if (!note) {
        return (
            <div className="layout flex flex-col">
                <Navbar href="/" title="Not found" />
                <Empty text={`no existing note with id '${id}'`} />;
            </div>
        );
    }

    return (
        <div className="layout flex flex-col">
            <Navbar href="/" title={note.title} />
            <FormNote
                defaultTitle={note.title}
                defaultBody={note.body}
                onSubmitHandler={newNoteHandler}
            />
        </div>
    );
}

EditNotePage.propTypes = {
    setNotes: PropTypes.func.isRequired,
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};

export default EditNotePage;
