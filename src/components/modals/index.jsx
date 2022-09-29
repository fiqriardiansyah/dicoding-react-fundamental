import React, { useState } from "react";
import PropTypes from "prop-types";

import CloseImg from "../../assets/svgs/close.svg";

function Modal({ children, component, title = "", loading = false }) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);

    const openModalHandler = () => {
        setShow(true);
    };

    const closeModalHandler = () => {
        setShow(false);
    };

    const openModalHandlerWithData = (dt) => {
        openModalHandler();
        setData(dt);
    };

    const childData = {
        show,
        data,
        openModalHandler,
        openModalHandlerWithData,
        closeModalHandler,
        loading,
    };

    if (!show) return component(childData);

    return (
        <div className="w-screen h-screen z-100 fixed top-0 left-0 bg-black-opacity-7 flex items-center justify-center">
            <div className="bg-white rounded-lg p-5 flex flex-col min-w-[350px] mx-3">
                <div className="flex items-center w-full justify-between">
                    <p className="capitalize text-lg">{title}</p>
                    <button
                        type="button"
                        onClick={closeModalHandler}
                        className="w-8 h-8 rounded-full p-2 hover:bg-tertiary dark:bg-tertiary-dark"
                    >
                        <img src={CloseImg} alt="close" />
                    </button>
                </div>
                {children(childData)}
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired,
    title: PropTypes.string,
    loading: PropTypes.bool,
};

export default Modal;
