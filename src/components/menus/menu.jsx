import React from "react";
import PropTypes from "prop-types";

function Menu({ children, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`px-4 py-1 rounded-full mr-2 text-white capitalize bg-secondary hover:bg-primary hover:outline-1 hover:outline-white hover:outline ${
                isActive ? "outline-1 outline-white outline" : ""
            }`}
        >
            {children}
        </button>
    );
}

Menu.propTypes = {
    children: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

export default Menu;
