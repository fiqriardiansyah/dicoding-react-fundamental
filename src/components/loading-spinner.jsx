import React from "react";
import PropTypes from "prop-types";

function LoadingSpinner({ size = "20px" }) {
    return (
        <div style={{ width: size, height: size }} className="loading-spinner">
            {[...[...new Array(3)].map((_, i) => i)].map((el) => {
                return <div key={el} style={{ width: size, height: size }} />;
            })}
        </div>
    );
}

LoadingSpinner.propTypes = {
    size: PropTypes.string,
};

export default LoadingSpinner;
