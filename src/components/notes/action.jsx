import React, { useRef } from "react";
import PropTypes from "prop-types";

import EllipsisImg from "../../assets/svgs/ellipsis.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { ACTION_MOVE, ACTION_REMOVE } from "../../utils/const";
import useLocale from "../../hooks/useLocale";

function Action({ openMenuHandler, showMenu, setShowMenu, onClick, note }) {
    const menuRef = useRef();
    const localeText = useLocale();

    useOnClickOutside(menuRef, () => {
        setShowMenu(false);
    });

    return (
        <>
            <button
                onClick={openMenuHandler}
                type="button"
                className="w-8 h-8 flex items-center justify-center bg-secondary dark:bg-secondary-dark  hover:bg-tertiary rounded-full absolute bottom-4 right-4"
            >
                <img src={EllipsisImg} alt="menu" className="w-1" />
            </button>

            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute bg-white rounded flex flex-col bottom-4 right-4 z-10"
                >
                    <button
                        onClick={() => onClick({ type: ACTION_REMOVE, note })}
                        type="button"
                        className="px-5 py-2 bg-white dark:bg-slate-200 rounded hover:text-red-400 text-left"
                    >
                        {localeText("delete")}
                    </button>
                    <button
                        onClick={() => onClick({ type: ACTION_MOVE, note })}
                        type="button"
                        className="px-5 py-2 bg-white dark:bg-slate-200 rounded  text-left"
                    >
                        {localeText(note.archived ? "active" : "archive")}
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
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        archived: PropTypes.bool.isRequired,
    }).isRequired,
};

export default Action;
