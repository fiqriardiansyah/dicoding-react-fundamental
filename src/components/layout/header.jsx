import React from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import { QUERY } from "../../utils/const";
import SearchInput from "../inputs/search-input";

function Header({ onSearchChange }) {
    const [searchParams] = useSearchParams();

    return (
        <div className="w-full flex flex-col py-4">
            <h1 className="text-white capitalize font-semibold text-2xl xl:text-4xl mb-4">
                Private Notes
            </h1>
            <div className="flex flex-col sticky top-4">
                <SearchInput
                    defaultValue={searchParams.get(QUERY)}
                    onSearchChange={onSearchChange}
                />
            </div>
        </div>
    );
}

Header.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
};

export default Header;
