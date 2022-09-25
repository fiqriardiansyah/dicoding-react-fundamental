import React from "react";
import parser from "html-react-parser";
import PropTypes from "prop-types";

import { useParams, Link, useNavigate } from "react-router-dom";
import utils from "../utils";

import EditImg from "../assets/svgs/edit.svg";
import DeleteImg from "../assets/svgs/delete.svg";

import Navbar from "../components/navbar";
import Modal from "../components/modals";
import ConfirmDeleteNote from "../components/confirm-delete-note";
import Empty from "../components/empty";

function NotePage({ notes, setNotes }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const note = notes.find((nt) => nt.id === id);

    const deleteHandler = () => {
        setNotes((prev) => utils.removeNote({ id, notes: prev }));
        navigate("/");
    };

    if (!note) {
        return (
            <div className="layout flex flex-col">
                <Navbar href="/" title="Not found" />
                <Empty text={`no existing note with id '${id}'`} />;
            </div>
        );
    }

    return (
        <div className="layout flex flex-col">
            <Navbar href="/" title={note.title} />
            <h1 className="text-white text-3xl capitalize">{note.title}</h1>
            <p className="text-slate-400">
                {utils.showFormattedDate(note.createdAt)}
            </p>
            <div className="font-light text-slate-300 mt-5 text-xl">
                {parser(note.body)}
            </div>
            <p
                className={`${
                    note.archived
                        ? "text-slate-400 outline-slate-400"
                        : "text-yellow-200 outline-yellow-200"
                } text-xs  w-fit outline outline-2 capitalize px-4 py-1 rounded-full mt-5`}
            >
                {note.archived ? "archived" : "active"}
            </p>
            <div className="fixed bottom-6 right-4 md:right-72 flex items-center">
                <Link to={`/edit/${id}`}>
                    <div className="w-10 h-10 z-20 flex items-center justify-center p-3 bg-tertiary hover:bg-white rounded-full text-2xl font-semibold">
                        <img src={EditImg} alt="edit" />
                    </div>
                </Link>
                <Modal
                    title="Delete"
                    component={(data) => (
                        <button
                            onClick={data.openModalHandler}
                            type="button"
                            className="ml-3 w-10 h-10 z-20 flex items-center justify-center p-3 bg-tertiary hover:bg-white rounded-full text-2xl font-semibold"
                        >
                            <img src={DeleteImg} alt="delete" />
                        </button>
                    )}
                >
                    {(data) => (
                        <ConfirmDeleteNote
                            onCancel={data.closeModalHandler}
                            onOk={() => {
                                data.closeModalHandler();
                                deleteHandler();
                            }}
                        />
                    )}
                </Modal>
            </div>
        </div>
    );
}

NotePage.propTypes = {
    setNotes: PropTypes.func.isRequired,
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

export default NotePage;
