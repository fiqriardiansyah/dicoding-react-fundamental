import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import parser from "html-react-parser";
import PropTypes from "prop-types";

import utils from "../../utils";
import { QUERY } from "../../utils/const";
import Action from "./action";
import useLocale from "../../hooks/useLocale";

function Note({ data: { id, title, body, createdAt, archived }, onClick }) {
    const [showMenu, setShowMenu] = useState(false);
    const [searchParams] = useSearchParams();
    const localeText = useLocale();

    const openMenuHandler = () => {
        setShowMenu(true);
    };

    return (
        <div className="w-full flex flex-col rounded-xl bg-base dark:bg-base-dark p-3 relative">
            <Link to={`/note/${id}`} className="focus:underline">
                <div className="text-text-primary dark:text-text-primary-dark text-lg font-medium capitalize hover:underline">
                    {parser(
                        utils.highlight({
                            text: searchParams.get(QUERY),
                            sentence: title,
                        }),
                    )}
                </div>
            </Link>
            <span className="text-slate-500 text-xs">
                {utils.showFormattedDate({
                    date: createdAt,
                    locale: localeText("format_date"),
                })}
            </span>
            <div className="text-slate-500 font-light my-3 max-h-[300px] overflow-auto">
                {parser(
                    utils.highlight({
                        text: searchParams.get(QUERY),
                        sentence: body,
                    }),
                )}
            </div>
            <p
                className={`${
                    archived
                        ? "text-slate-400 outline-slate-400"
                        : "text-yellow-200 outline-yellow-200"
                } text-xs  w-fit outline outline-2 capitalize px-4 py-1 rounded-full mt-5`}
            >
                {localeText(archived ? "archive" : "active")}
            </p>
            <Action
                openMenuHandler={openMenuHandler}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                onClick={onClick}
                note={{ id, title, body, createdAt, archived }}
            />
        </div>
    );
}

Note.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        archived: PropTypes.bool.isRequired,
    }),
    onClick: PropTypes.func.isRequired,
};

export default Note;
