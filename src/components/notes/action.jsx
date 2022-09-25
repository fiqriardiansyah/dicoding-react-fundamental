import React, { forwardRef, useRef } from "react";
import PropTypes from "prop-types";

import EllipsisImg from "../../assets/svgs/ellipsis.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { ACTION_EDIT, ACTION_MOVE, ACTION_REMOVE } from "../../utils/const";

function Action({
    openMenuHandler,
    showMenu,
    setShowMenu,
    onClick,
    note: { id, archived },
}) {
    const menuRef = useRef();

    useOnClickOutside(menuRef, () => {
        setShowMenu(false);
    });

    return (
        <>
            <button
                onClick={openMenuHandler}
                type="button"
                className="w-8 h-8 flex items-center justify-center bg-secondary hover:bg-tertiary rounded-full absolute bottom-4 right-4"
            >
                <img src={EllipsisImg} alt="menu" className="w-1" />
            </button>

            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute bg-white rounded flex flex-col bottom-4 right-4 z-10"
                >
                    <button
                        onClick={() => onClick({ type: ACTION_REMOVE, id })}
                        type="button"
                        className="px-5 py-2 bg-slate-200 rounded hover:text-red-400 text-left"
                    >
                        delete
                    </button>
                    <button
                        onClick={() => onClick({ type: ACTION_MOVE, id })}
                        type="button"
                        className="px-5 py-2 bg-slate-200 rounded  text-left"
                    >
                        {archived ? "activate" : "archive"}
                    </button>
                    <button
                        onClick={() => onClick({ type: ACTION_EDIT, id })}
                        type="button"
                        className="px-5 py-2 bg-slate-200 rounded  text-left"
                    >
                        edit
                    </button>
                </div>
            )}
        </>
    );
}

Action.propTypes = {
    openMenuHandler: PropTypes.func.isRequired,
    showMenu: PropTypes.bool.isRequired,
    setShowMenu: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    note: PropTypes.shape({
        id: PropTypes.string,
        archived: PropTypes.bool,
    }).isRequired,
};

export default Action;
