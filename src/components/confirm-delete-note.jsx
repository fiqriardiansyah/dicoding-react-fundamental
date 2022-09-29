import React from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "./loading-spinner";

import utils from "../utils";
import useLocale from "../hooks/useLocale";

function ConfirmDeleteNote({ note = null, onOk, onCancel, loading = false }) {
    const localeText = useLocale();
    return (
        <div className="w-full mt-3">
            <p className="text-red-400 capitalize">
                {localeText("you_sure_to_delete")}
            </p>
            {note && (
                <div className="w-full p-3 bg-secondary dark:bg-secondary-dark  rounded-lg mt-2">
                    <p className="capitalize text-text-primary dark:text-text-primary-dark">
                        {note.title}
                    </p>
                    <p className="text-primary-dark dark:text-slate-300 text-xs">
                        {utils.showFormattedDate({
                            date: note.createdAt,
                            locale: localeText("format_date"),
                        })}
                    </p>
                </div>
            )}
            <div className="w-full flex items-center justify-end mt-3">
                <button
                    disabled={loading}
                    onClick={() => onOk(note)}
                    type="button"
                    className="bg-red-400 px-3 py-1 rounded text-text-primary dark:text-text-primary-dark capitalize opacity-75 hover:opacity-100 mr-2"
                >
                    {loading ? <LoadingSpinner /> : localeText("delete")}
                </button>
                <button
                    onClick={onCancel}
                    type="button"
                    className="px-3 py-1 capitalize"
                >
                    {localeText("cancel")}
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
    loading: PropTypes.bool,
};

export default ConfirmDeleteNote;
