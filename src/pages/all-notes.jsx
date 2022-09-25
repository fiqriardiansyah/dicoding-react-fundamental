import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import ConfirmDeleteNote from "../components/confirm-delete-note";
import Empty from "../components/empty";
import Layout from "../components/layout";
import Modal from "../components/modals";
import Notes from "../components/notes";
import utils from "../utils";
import { ACTION_EDIT, ACTION_MOVE, ACTION_REMOVE } from "../utils/const";

function AllNotesPage({ notes, setNotes }) {
    const deleteRef = useRef();
    const navigate = useNavigate();

    const showDeleteConfirm = (id) => {
        if (deleteRef.current) {
            deleteRef.current.dataset.idnote = id;
            deleteRef.current.click();
        }
    };

    const deleteHandler = (note) => {
        setNotes((prev) => utils.removeNote({ id: note.id, notes: prev }));
    };

    const onClickActionNote = ({ type, id }) => {
        if (type === ACTION_REMOVE) {
            showDeleteConfirm(id);
            return;
        }
        if (type === ACTION_MOVE) {
            setNotes((prev) => utils.moveNote({ id, notes: prev }));
            return;
        }
        if (type === ACTION_EDIT) {
            navigate(`/edit/${id}`);
        }
    };

    return (
        <>
            <Layout notes={notes}>
                {({ notes: nts, query }) =>
                    nts?.length !== 0 ? (
                        <Notes notes={nts} onClick={onClickActionNote} />
                    ) : (
                        <Empty
                            text={
                                query
                                    ? `No notes for '${query}'`
                                    : "No existing note found, lets make one"
                            }
                        />
                    )
                }
            </Layout>
            <Modal
                title="Delete"
                component={({ openModalHandlerWithData }) => (
                    <button
                        onClick={() =>
                            openModalHandlerWithData(
                                deleteRef.current.dataset.idnote,
                            )
                        }
                        ref={deleteRef}
                        type="button"
                        className="hidden"
                    >
                        delete
                    </button>
                )}
            >
                {({ closeModalHandler, data }) => (
                    <ConfirmDeleteNote
                        note={utils.getNote(data, notes)}
                        onCancel={closeModalHandler}
                        onOk={(note) => {
                            closeModalHandler();
                            deleteHandler(note);
                        }}
                    />
                )}
            </Modal>
        </>
    );
}

AllNotesPage.propTypes = {
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

export default AllNotesPage;
