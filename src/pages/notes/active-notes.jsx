import React, { useEffect, useRef } from "react";

import Modal from "../../components/modals";
import ConfirmDeleteNote from "../../components/confirm-delete-note";
import Empty from "../../components/empty";
import Layout from "../../components/layout";
import Notes from "../../components/notes";
import utils from "../../utils";
import { ACTION_MOVE, ACTION_REMOVE, DANGER, INFO } from "../../utils/const";
import Apis from "../../service/apis";
import useFetchState from "../../hooks/useFetchState";
import LoadingSpinner from "../../components/loading-spinner";
import Alert from "../../components/alert";
import BottomStack from "../../components/bottom-stack";
import useLocale from "../../hooks/useLocale";

function ActiveNotesPage() {
    const getNotes = useFetchState();
    const deleteNote = useFetchState();
    const setArchiveNote = useFetchState();
    const setUnArchiveNote = useFetchState();

    const deleteRef = useRef();

    const localeText = useLocale();

    const getNotesFetcher = () => {
        getNotes.fetchStart();
        Apis.getNotes()
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    getNotes.fetchSuccess(res.data?.data);
                    return;
                }
                getNotes.fetchFailed(
                    res?.res?.data?.message || localeText("default_error"),
                );
            })
            .catch((err) => {
                getNotes.fetchFailed(
                    err?.message || localeText("default_error"),
                );
            });
    };

    const deleteNoteFetcher = (note) => {
        deleteNote.fetchStart();
        Apis.deleteNote(note.id)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    deleteNote.fetchSuccess(res.data?.data);
                    getNotesFetcher();
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
                    getNotesFetcher();
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
        getNotesFetcher();
    }, []);

    return (
        <>
            <Layout notes={getNotes.data || []}>
                {function ({ notes: nts, query }) {
                    if (getNotes.loading) {
                        return (
                            <div className="w-full flex items-center justify-center h-50vh">
                                <LoadingSpinner size="100px" />
                            </div>
                        );
                    }

                    if (getNotes.error) {
                        return <Alert text={getNotes.error} type={DANGER} />;
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
                                    : localeText("no_active_notes")
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
                        note={utils.getNote(data, getNotes.data || [])}
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

export default ActiveNotesPage;
