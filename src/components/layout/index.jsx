import React from "react";
import {
    useLocation,
    useNavigate,
    useSearchParams,
    Link,
} from "react-router-dom";
import PropTypes from "prop-types";

import Header from "./header";
import Menus from "../menus";

import utils from "../../utils";
import { QUERY } from "../../utils/const";

function Layout({ children, notes }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const onSearchChange = (q) => {
        setSearchParams({ [QUERY]: q });
    };

    const onCLickMenuHandler = (menu) => {
        navigate(`/${menu.key}`);
    };

    return (
        <div className="layout">
            <Header onSearchChange={onSearchChange} />
            <Menus
                menuActive={location.pathname}
                clickHandler={onCLickMenuHandler}
            />
            {children({
                notes: utils.filterNotes({
                    query: searchParams.get(QUERY),
                    notes,
                }),
                [QUERY]: searchParams.get(QUERY),
            })}
            <Link to="/new">
                <button
                    type="button"
                    className="right-4 md:right-72 w-10 h-10 z-20 bg-tertiary hover:bg-white rounded-full fixed bottom-6 text-2xl font-semibold"
                >
                    +
                </button>
            </Link>
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.func.isRequired,
    notes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            archived: PropTypes.bool.isRequired,
        }),
    ).isRequired,
};

export default Layout;
