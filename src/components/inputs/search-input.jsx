import React, { useState } from "react";
import PropTypes from "prop-types";

import SearchImg from "../../assets/svgs/search.svg";
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
                className="w-full h-12 rounded-full px-8 text-white bg-secondary border-none focus:bg-slate-50 focus:text-primary"
            />
            <div className="w-10 h-10 p-2 border-none bg-primary  rounded-full absolute top-1/2 right-2 transform -translate-y-1/2">
                <img src={SearchImg} alt="search" />
            </div>
        </div>
    );
}

SearchInput.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.string,
};

export default SearchInput;
