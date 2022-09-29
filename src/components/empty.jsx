import React from "react";
import PropTypes from "prop-types";

import EmptyImg from "../assets/svgs/empty-vector.svg";

function Empty({ text = "note empty, lets make one!" }) {
    return (
        <div className="w-full flex flex-col items-center justify-center opacity-80 h-60vh">
            <img
                src={EmptyImg}
                alt="empty"
                className="w-[300px] min-h-[250px]"
            />
            <p className="text-text-primary dark:text-text-primary-dark capitalize text-2xl font-light mt-4">
                {text}
            </p>
        </div>
    );
}

Empty.propTypes = {
    text: PropTypes.string,
};

export default Empty;
