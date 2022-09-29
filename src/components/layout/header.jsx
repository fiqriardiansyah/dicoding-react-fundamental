import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { TbLanguage } from "react-icons/tb";

import { SettingContext } from "../../context/setting";

import { DARK_MODE, QUERY } from "../../utils/const";
import SearchInput from "../inputs/search-input";
import Account from "./account";
import useLocale from "../../hooks/useLocale";

function Header({ onSearchChange, search = false }) {
    const { setting, toggleLang, toggleTheme } = useContext(SettingContext);
    const [searchParams] = useSearchParams();
    const localeText = useLocale();

    const clickThemeModeHandler = () => {
        toggleTheme();
    };

    const clickLangHandler = () => {
        toggleLang();
    };

    return (
        <div className="w-full flex flex-col py-4 relative">
            <div className="w-full flex items-center justify-between">
                <h1 className="text-text-primary dark:text-text-primary-dark capitalize font-semibold text-2xl xl:text-4xl mb-4">
                    {localeText("private_notes")}
                </h1>
                <div className="flex items-center">
                    <button
                        onClick={clickLangHandler}
                        type="button"
                        className="text-text-primary dark:text-text-primary-dark hover:opacity-70 text-3xl"
                    >
                        <TbLanguage />
                    </button>
                    <button
                        onClick={clickThemeModeHandler}
                        type="button"
                        className="text-text-primary dark:text-text-primary-dark hover:opacity-70 text-3xl ml-5"
                    >
                        {setting.theme === DARK_MODE ? (
                            <HiOutlineSun />
                        ) : (
                            <HiOutlineMoon />
                        )}
                    </button>
                    <Account />
                </div>
            </div>
            {search && (
                <div className="flex flex-col sticky top-4">
                    <SearchInput
                        defaultValue={searchParams.get(QUERY)}
                        onSearchChange={onSearchChange}
                    />
                </div>
            )}
        </div>
    );
}

Header.propTypes = {
    onSearchChange: PropTypes.func,
    search: PropTypes.bool,
};

export default Header;
