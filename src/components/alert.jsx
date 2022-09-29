import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { DANGER, INFO, STATUS, SUCCESS, WARNING } from "../utils/const";

function Alert({ text = "", type = SUCCESS, children }) {
    const classname = classNames(
        "text-white px-5 capitalize text-lg py-2 text-center flex items-cente justify-center rounded mt-2",
        {
            "bg-green-400": type === SUCCESS,
            "bg-red-400": type === DANGER,
            "bg-orange-300": type === WARNING,
            "bg-tertiary": type === STATUS,
            "bg-transparent": type === INFO,
        },
    );
    if (text) {
        return <p className={classname}>{text}</p>;
    }
    return <div className={classname}>{children}</div>;
}

Alert.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf([SUCCESS, DANGER, WARNING, INFO, STATUS]).isRequired,
    children: PropTypes.element,
};

export default Alert;
