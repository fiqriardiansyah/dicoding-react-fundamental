import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BackImg from "../assets/svgs/back.svg";

function Navbar({ href, title }) {
    return (
        <div className="w-full flex items-center py-5">
            <Link to={href}>
                <div
                    type="button"
                    className="w-10 h-10 bg-tertiary hover:bg-white rounded-full flex items-center justify-center p-3"
                >
                    <img src={BackImg} className="" alt="back" />
                </div>
            </Link>
            <h1 className="text-white font-semibold text-2xl xl:text-4xl capitalize ml-5 max-1-line">
                {title}
            </h1>
        </div>
    );
}

Navbar.propTypes = {
    href: PropTypes.string.isRequired,
    title: PropTypes.string,
};

export default Navbar;
