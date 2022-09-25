import React from "react";
import PropTypes from "prop-types";

import utils from "../utils";

function ConfirmDeleteNote({ note = null, onOk, onCancel }) {
    return (
        <div className="w-full mt-3">
            <p className="text-red-400 capitalize">
                you sure delete this note?
            </p>
            {note && (
                <div className="w-full p-3 bg-secondary rounded-lg mt-2">
                    <p className="capitalize text-white">{note.title}</p>
                    <p className="text-slate-300 text-xs">
                        {utils.showFormattedDate(note.createdAt)}
                    </p>
                </div>
            )}
            <div className="w-full flex items-center justify-end mt-3">
                <button
                    onClick={() => onOk(note)}
                    type="button"
                    className="bg-red-400 px-3 py-1 rounded text-white capitalize opacity-75 hover:opacity-100 mr-2"
                >
                    delete
                </button>
                <button
                    onClick={onCancel}
                    type="button"
                    className="px-3 py-1 capitalize"
                >
                    cancel
                </button>
            </div>
        </div>
    );
}

ConfirmDeleteNote.propTypes = {
    note: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        archived: PropTypes.bool.isRequired,
    }),
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmDeleteNote;
