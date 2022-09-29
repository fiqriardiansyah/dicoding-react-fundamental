import React, { useEffect, useMemo, useRef } from "react";
import axios from "axios";

import Apis from "../../service/apis";

import useFetchState from "../../hooks/useFetchState";

import Alert from "../../components/alert";
import LoadingSpinner from "../../components/loading-spinner";
import ConfirmDeleteNote from "../../components/confirm-delete-note";
import Empty from "../../components/empty";
import Layout from "../../components/layout";
import Modal from "../../components/modals";
import Notes from "../../components/notes";
import utils from "../../utils";
import { ACTION_MOVE, ACTION_REMOVE, DANGER, INFO } from "../../utils/const";
import BottomStack from "../../components/bottom-stack";
import useLocale from "../../hooks/useLocale";

function AllNotesPage() {
    const getNotes = useFetchState();
    const getArchivedNotes = useFetchState();
    const deleteNote = useFetchState();
    const setArchiveNote = useFetchState();
    const setUnArchiveNote = useFetchState();

    const localeText = useLocale();

    const deleteRef = useRef();

    const getAllNotesFetcher = () => {
        getNotes.fetchStart();
        getArchivedNotes.fetchStart();
        Promise.all([Apis.getNotes(), Apis.getArchivedNotes()])
            .then(
                axios.spread((...responses) => {
                    responses.forEach((response, index) => {
                        if (response.status >= 200 && response.status < 300) {
                            [getNotes, getArchivedNotes][index].fetchSuccess(
                                response.data?.data,
                            );
                            return;
                        }
                        [getNotes, getArchivedNotes][index].fetchFailed(
                            response?.response?.data?.message ||
                                localeText("default_error"),
                        );
                    });
                }),
            )
            .catch(() => {
                getNotes.fetchFailed(localeText("default_error"));
                getArchivedNotes.fetchFailed(localeText("default_error"));
            });
    };

    const deleteNoteFetcher = (note) => {
        deleteNote.fetchStart();
        Apis.deleteNote(note.id)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    deleteNote.fetchSuccess(res.data?.data);
                    getAllNotesFetcher();
                    return;
                }
                deleteNote.fetchFailed(
                    res?.response?.data?.message || localeText("default_error"),
                );
            })
            .catch((err) => {
                deleteNote.fetchFailed(
                    err?.response?.data?.message || localeText("default_error"),
                );
            });
    };

    const toggleArchiveNoteFetcher = (note) => {
        const statusNotes = [
            {
                archive: true,
                state: setArchiveNote,
                fetcher: Apis.archiveNote,
            },
            {
                archive: false,
                state: setUnArchiveNote,
                fetcher: Apis.unArchiveNote,
            },
        ];

        const statusNote = statusNotes.find(
            (status) => status.archive !== note.archived,
        );

        statusNote.state.fetchStart();
        statusNote
            .fetcher(note.id)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    statusNote.state.fetchSuccess(res.data?.data);
                    getAllNotesFetcher();
                    return;
                }
                statusNote.state.fetchFailed(
                    res?.response?.data?.message || localeText("default_error"),
                );
            })
            .catch((err) => {
                statusNote.state.fetchFailed(
                    err?.response?.data?.message || localeText("default_error"),
                );
            });
    };

    const showDeleteConfirm = (note) => {
        if (deleteRef.current) {
            deleteRef.current.dataset.idnote = note.id;
            deleteRef.current.click();
        }
    };

    const onClickActionNote = ({ type, note }) => {
        if (type === ACTION_REMOVE) {
            showDeleteConfirm(note);
            return;
        }
        if (type === ACTION_MOVE) {
            toggleArchiveNoteFetcher(note);
        }
    };

    useEffect(() => {
        getAllNotesFetcher();
    }, []);

    const allNotes = useMemo(() => {
        const notes = getNotes.data || [];
        const archiveNotes = getArchivedNotes.data || [];
        return notes.concat(archiveNotes);
    }, [getNotes.data, getArchivedNotes.data]);

    return (
        <>
            <Layout notes={allNotes}>
                {function ({ notes: nts, query }) {
                    if (getNotes.loading || getArchivedNotes.loading) {
                        return (
                            <div className="w-full flex items-center justify-center h-50vh">
                                <LoadingSpinner size="100px" />
                            </div>
                        );
                    }

                    if (getNotes.error || getArchivedNotes.error) {
                        return (
                            <Alert
                                text={getNotes.error || getArchivedNotes.error}
                                type={DANGER}
                            />
                        );
                    }

                    return nts?.length !== 0 ? (
                        <Notes
                            loading={deleteNote.loading}
                            notes={nts}
                            onClick={onClickActionNote}
                        />
                    ) : (
                        <Empty
                            text={
                                query
                                    ? `${localeText("no_notes_for")}'${query}'`
                                    : localeText("no_existing_notes")
                            }
                        />
                    );
                }}
            </Layout>
            <Modal
                loading={deleteNote.loading}
                title={localeText("delete")}
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
                        {localeText("delete")}
                    </button>
                )}
            >
                {({ closeModalHandler, data, loading }) => (
                    <ConfirmDeleteNote
                        loading={loading}
                        note={utils.getNote(data, allNotes)}
                        onCancel={closeModalHandler}
                        onOk={(note) => {
                            closeModalHandler();
                            deleteNoteFetcher(note);
                        }}
                    />
                )}
            </Modal>
            <BottomStack>
                <>
                    {deleteNote.loading && (
                        <Alert type={INFO}>
                            <div className="flex items-center">
                                <LoadingSpinner />
                                <p className="ml-3">
                                    {localeText("deleting_note")}
                                </p>
                            </div>
                        </Alert>
                    )}
                    {(setUnArchiveNote.loading || setArchiveNote.loading) && (
                        <Alert type={INFO}>
                            <div className="flex items-center">
                                <LoadingSpinner />
                                <p className="ml-3">
                                    {setArchiveNote.loading &&
                                        localeText("archiving_note")}
                                    {setUnArchiveNote.loading &&
                                        localeText("unarchiving_note")}
                                </p>
                            </div>
                        </Alert>
                    )}
                </>
            </BottomStack>
        </>
    );
}

export default AllNotesPage;
