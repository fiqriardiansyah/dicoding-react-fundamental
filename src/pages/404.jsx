import React from "react";
import Navbar from "../components/navbar";
import Empty from "../components/empty";

function NotFoundPage() {
    return (
        <div className="layout flex flex-col">
            <Navbar href="/" title="Page Not found" />
            <Empty text="Ooops page you looking for is not found!" />;
        </div>
    );
}

export default NotFoundPage;
