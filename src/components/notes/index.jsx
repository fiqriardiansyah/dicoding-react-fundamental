import React from "react";
import PropTypes from "prop-types";

import Note from "./note";

function Notes({ notes, onClick }) {
    return (
        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 pb-20">
            {notes?.map((el) => (
                <Note data={el} key={el.id} onClick={onClick} />
            ))}
        </div>
    );
}

Notes.propTypes = {
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
        }),
    ),
    onClick: PropTypes.func.isRequired,
};

export default Notes;
