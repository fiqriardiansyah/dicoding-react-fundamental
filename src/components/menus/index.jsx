import React from "react";
import PropTypes from "prop-types";

import { MENUS } from "../../utils/const";
import Menu from "./menu";

function Menus({ menuActive, clickHandler }) {
    const onClick = (id) => {
        clickHandler(MENUS.find((el) => el.id === id));
    };

    const key = menuActive.split("/")[1];

    return (
        <div className="w-full flex items-center flex-wrap my-3">
            {MENUS.map((el) => (
                <Menu
                    onClick={() => onClick(el.id)}
                    key={el.id}
                    isActive={el.key === key}
                >
                    {el.name}
                </Menu>
            ))}
        </div>
    );
}

Menus.propTypes = {
    menuActive: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
};

export default Menus;
