import React from "react";
import PropTypes from "prop-types";

import Input from "./inputs/input";
import NoteTextarea from "./inputs/note-textarea";
import LoadingSpinner from "./loading-spinner";
import useLocale from "../hooks/useLocale";

function FormNote({
    onSubmitHandler,
    defaultTitle,
    defaultBody,
    loading = false,
}) {
    const localeText = useLocale();
    const onSubmit = (e) => {
        e.preventDefault();
        const title = e.target.elements.title.value;
        const body = e.target.querySelector("#body").innerHTML;
        onSubmitHandler({ title, body });
    };

    return (
        <form action="" onSubmit={onSubmit} className="w-full mt-3">
            <Input
                limit
                defaultValue={defaultTitle}
                name="title"
                placeholder={localeText("note_title")}
            />
            <div className="h-4" />
            <NoteTextarea
                id="body"
                placeholder={localeText("body")}
                defaultValue={defaultBody}
            />
            <button
                disabled={loading}
                type="submit"
                className="mt-5 outline-1 outline text-white outline-primary px-5 py-2 rounded-md bg-secondary hover:bg-tertiary hover:text-white focus:bg-tertiary capitalize"
            >
                {loading ? <LoadingSpinner /> : localeText("save")}
            </button>
        </form>
    );
}

FormNote.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
    defaultTitle: PropTypes.string,
    defaultBody: PropTypes.string,
    loading: PropTypes.bool,
};

export default FormNote;
