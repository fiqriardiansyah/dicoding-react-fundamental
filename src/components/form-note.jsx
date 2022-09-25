import React from "react";
import PropTypes from "prop-types";

import NoteInput from "./inputs/note-input";
import NoteTextarea from "./inputs/note-textarea";

function FormNote({ onSubmitHandler, defaultTitle, defaultBody }) {
    const onSubmit = (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.querySelector("#body").innerHTML;
        onSubmitHandler({ title, body });
    };

    return (
        <form action="" onSubmit={onSubmit} className="w-full mt-3">
            <NoteInput
                defaultValue={defaultTitle}
                name="title"
                placeholder="Note title"
            />
            <div className="h-4" />
            <NoteTextarea
                id="body"
                placeholder="body"
                defaultValue={defaultBody}
            />
            <button
                type="submit"
                className="mt-5 outline-1 outline text-white outline-primary px-5 py-2 rounded-md bg-secondary hover:bg-tertiary hover:text-white focus:bg-tertiary capitalize"
            >
                save
            </button>
        </form>
    );
}

FormNote.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
    defaultTitle: PropTypes.string,
    defaultBody: PropTypes.string,
};

export default FormNote;
