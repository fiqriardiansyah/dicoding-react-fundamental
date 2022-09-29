import { useContext } from "react";
import { SettingContext } from "../context/setting";
import utils from "../utils";

const useLocale = () => {
    const { setting } = useContext(SettingContext);

    const localeText = (word) => {
        return utils.localeText({ lang: setting.lang, word }) || "";
    };

    return localeText;
};

export default useLocale;
