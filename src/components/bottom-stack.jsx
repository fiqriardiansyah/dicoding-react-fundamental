import React from "react";
import PropTypes from "prop-types";

function BottomStack({ children }) {
    return (
        <div className="p-2 fixed z-100 bottom-0 xl:left-72 xl:right-72 md:left-56 md:right-56 right-4 left-4">
            {children}
        </div>
    );
}

BottomStack.propTypes = {
    children: PropTypes.element,
};

export default BottomStack;
