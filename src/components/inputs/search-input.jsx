import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";

import useLocale from "../../hooks/useLocale";

function SearchInput({ onSearchChange, defaultValue }) {
    const [value, setValue] = useState(defaultValue || "");
    const localeText = useLocale();

    const onChange = (e) => {
        const { value: v } = e.target;
        setValue(v);
        onSearchChange(v);
    };

    return (
        <div className="w-full flex items-center relative flex-col ">
            <input
                value={value}
                onChange={onChange}
                type="text"
                placeholder={localeText("search_notes")}
                className="w-full h-12 rounded-full px-8 text-text-primary dark:text-text-primary-dark bg-secondary dark:bg-secondary-dark  border-none focus:bg-slate-50 focus:text-text-primary focus:dark:text-text-primary-dark"
            />
            <div className="text-text-primary dark:text-text-primary-dark w-10 h-10 p-1 border-none bg-primary dark:bg-primary-dark flex items-center justify-center rounded-full absolute top-1/2 right-2 transform -translate-y-1/2">
                <FiSearch />
            </div>
        </div>
    );
}

SearchInput.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
};

export default SearchInput;
