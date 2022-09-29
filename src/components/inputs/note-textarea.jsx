import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function NoteTextarea({ id = "", placeholder = "", defaultValue = "" }) {
    const thisRef = useRef();

    useEffect(() => {
        if (defaultValue && thisRef.current) {
            thisRef.current.innerHTML = defaultValue;
        }
    }, [defaultValue]);

    return (
        <div
            ref={thisRef}
            id={id}
            contentEditable
            placeholder={placeholder}
            className="w-full rounded-lg p-3 min-h-[200px] text-text-primary dark:text-text-primary-dark bg-secondary dark:bg-secondary-dark  border-none focus:outline-primary"
        />
    );
}

NoteTextarea.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
};

export default NoteTextarea;
