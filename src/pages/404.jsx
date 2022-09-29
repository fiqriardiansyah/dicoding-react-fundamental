import React from "react";
import Navbar from "../components/navbar";
import Empty from "../components/empty";
import useLocale from "../hooks/useLocale";

function NotFoundPage() {
    const localeText = useLocale();
    return (
        <div className="layout flex flex-col">
            <Navbar href="/" title={localeText("page_not_found")} />
            <Empty text={localeText("ooops_page_not_found")} />;
        </div>
    );
}

export default NotFoundPage;
