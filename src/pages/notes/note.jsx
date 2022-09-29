import React, { useEffect } from "react";
import parser from "html-react-parser";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { useParams, useNavigate } from "react-router-dom";

import utils from "../../utils";

import DeleteImg from "../../assets/svgs/delete.svg";

import Navbar from "../../components/navbar";
import Modal from "../../components/modals";
import ConfirmDeleteNote from "../../components/confirm-delete-note";
import Empty from "../../components/empty";
import useFetchState from "../../hooks/useFetchState";
import Apis from "../../service/apis";
import { INFO } from "../../utils/const";
import LoadingSpinner from "../../components/loading-spinner";
import BottomStack from "../../components/bottom-stack";
import Alert from "../../components/alert";
import useLocale from "../../hooks/useLocale";

function NotePage() {
    const getNote = useFetchState();
    const deleteNote = useFetchState();
    const setArchiveNote = useFetchState();
    const setUnArchiveNote = useFetchState();
    const { id } = useParams();
    const navigate = useNavigate();

    const localeText = useLocale();

    const getNoteFetcher = () => {
        getNote.fetchStart();
        Apis.getSingleNote(id)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    getNote.fetchSuccess(res.data?.data);
                    return;
                }
                getNote.fetchFailed(
                    res?.response?.data?.message || localeText("default_error"),
                );
            })
            .catch((err) => {
                getNote.fetchFailed(
                    err?.message || localeText("default_error"),
                );
            });
    };

    const toggleArchiveNoteFetcher = () => {
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
            (status) => status.archive !== getNote.data.archived,
        );

        statusNote.state.fetchStart();
        statusNote
            .fetcher(getNote.data.id)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    statusNote.state.fetchSuccess(res.data?.data);
                    getNoteFetcher();
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

    const deleteNoteFetcher = () => {
        deleteNote.fetchStart();
        Apis.deleteNote(id)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    deleteNote.fetchSuccess(res.data?.data);
                    navigate("/");
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

    useEffect(() => {
        getNoteFetcher();
    }, []);

    if (!id) {
        return (
            <div className="layout flex flex-col">
                <Navbar href="/" title={localeText("not_found")} />
                <Empty text={getNote.error} />;
            </div>
        );
    }

    return (
        <>
            <div className="layout flex flex-col">
                <Navbar
                    href="/"
                    title={
                        getNote.loading
                            ? localeText("loading")
                            : getNote.data?.title || localeText("untitled")
                    }
                />
                {getNote.error && <Empty text={getNote.error} />}
                {getNote.loading && (
                    <div className="w-full flex items-center justify-center h-50vh">
                        <LoadingSpinner size="100px" />
                    </div>
                )}
                {!getNote.loading && getNote.data && (
                    <div className="w-full flex flex-col">
                        <h1 className="text-text-primary dark:text-text-primary-dark text-3xl capitalize">
                            {getNote.data?.title}
                        </h1>
                        <p className="text-slate-400">
                            {utils.showFormattedDate({
                                date: getNote.data?.createdAt,
                                locale: localeText("format_date"),
                            })}
                        </p>
                        <div className="font-light text-slate-300 mt-5 text-xl">
                            {parser(getNote.data?.body)}
                        </div>
                        <p
                            className={`${
                                getNote.data?.archived
                                    ? "text-slate-400 outline-slate-400"
                                    : "text-yellow-200 outline-yellow-200"
                            } text-xs  w-fit outline outline-2 capitalize px-4 py-1 rounded-full mt-5`}
                        >
                            {localeText(
                                getNote.data?.archived ? "archive" : "active",
                            )}
                        </p>
                    </div>
                )}
                <div className="fixed bottom-6 right-4 md:right-72 flex items-center">
                    <button
                        onClick={toggleArchiveNoteFetcher}
                        type="button"
                        className="ml-3 w-10 h-10 z-20 flex items-center justify-center p-2 bg-tertiary dark:bg-tertiary-dark hover:bg-white rounded-full text-2xl font-semibold"
                    >
                        {getNote.data?.archived ? (
                            <BiArchiveOut />
                        ) : (
                            <BiArchiveIn />
                        )}
                    </button>
                    <Modal
                        title={localeText("delete")}
                        component={(data) => (
                            <button
                                onClick={data.openModalHandler}
                                type="button"
                                className="ml-3 w-10 h-10 z-20 flex items-center justify-center p-3 bg-tertiary dark:bg-tertiary-dark hover:bg-white rounded-full text-2xl font-semibold"
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
                                    deleteNoteFetcher();
                                }}
                            />
                        )}
                    </Modal>
                </div>
            </div>
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

export default NotePage;
