import React, { useState } from "react";
import PropTypes from "prop-types";

function NoteInput({
    id = "",
    name = "",
    type = "text",
    placeholder = "",
    defaultValue = "",
}) {
    const maxChar = 50;
    const [value, setValue] = useState(defaultValue);

    const onChange = (e) => {
        const { value: v } = e.target;
        if (maxChar - v.length < 0) return;
        setValue(v);
    };

    return (
        <>
            <div className="flex items-center justify-end w-full mb-1">
                <p className="capitalize text-white text-sm">{`remaining characters: ${
                    maxChar - value.length
                }`}</p>
            </div>
            <input
                required
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                className="w-full h-12 rounded-lg px-3 text-white bg-secondary border-none focus:outline-primary"
            />
        </>
    );
}

NoteInput.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
};

export default NoteInput;
