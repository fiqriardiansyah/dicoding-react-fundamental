import React, { useState } from "react";
import PropTypes from "prop-types";
import useLocale from "../../hooks/useLocale";

function Input({
    id = "",
    name = "",
    type = "text",
    placeholder = "",
    defaultValue = "",
    maxChar = 50,
    limit = false,
}) {
    const [value, setValue] = useState(defaultValue);
    const localeText = useLocale();

    const onChange = (e) => {
        const { value: v } = e.target;
        if (maxChar - v.length < 0 && limit) return;
        setValue(v);
    };

    return (
        <>
            {limit && (
                <div className="flex items-center justify-end w-full mb-1">
                    <p className="capitalize text-text-primary dark:text-text-primary-dark text-sm">{`${localeText(
                        "remaining_characters",
                    )}: ${maxChar - value.length}`}</p>
                </div>
            )}
            <input
                required
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                name={name}
                id={id}
                className="w-full h-12 rounded-lg px-3 text-text-primary dark:text-text-primary-dark bg-secondary dark:bg-secondary-dark  border-none focus:outline-primary"
            />
        </>
    );
}

Input.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    maxChar: PropTypes.number,
    limit: PropTypes.bool,
};

export default Input;
