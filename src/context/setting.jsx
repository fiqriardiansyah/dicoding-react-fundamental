import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
    DARK_MODE,
    LANG,
    LANG_EN,
    LANG_ID,
    LIGHT_MODE,
    THEME_MODE,
} from "../utils/const";

const SettingContext = createContext();

function SettingProvider({ children }) {
    const [setting, setSetting] = useState({
        theme: localStorage.getItem(THEME_MODE) || DARK_MODE,
        lang: localStorage.getItem(LANG) || LANG_ID,
    });

    const toggleTheme = () => {
        setSetting((prev) => {
            const theme = prev.theme === DARK_MODE ? LIGHT_MODE : DARK_MODE;
            localStorage.setItem(THEME_MODE, theme);
            return {
                ...prev,
                theme,
            };
        });
    };

    const toggleLang = () => {
        setSetting((prev) => {
            const lang = prev.lang === LANG_ID ? LANG_EN : LANG_ID;
            localStorage.setItem(LANG, lang);
            return {
                ...prev,
                lang,
            };
        });
    };

    const value = useMemo(
        () => ({ setting, setSetting, toggleTheme, toggleLang }),
        [setting],
    );
    return (
        <SettingContext.Provider value={value}>
            {children}
        </SettingContext.Provider>
    );
}

SettingContext.Provider.propTypes = {
    value: PropTypes.shape({
        setting: PropTypes.shape({
            theme: PropTypes.oneOf([LIGHT_MODE, DARK_MODE]),
            lang: PropTypes.oneOf([LANG_ID, LANG_EN]),
        }),
        setSetting: PropTypes.func,
    }),
};

export { SettingContext, SettingProvider };
