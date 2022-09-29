import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/navbar";
import FormNote from "../../components/form-note";
import useFetchState from "../../hooks/useFetchState";
import Apis from "../../service/apis";
import Alert from "../../components/alert";
import { DANGER, SUCCESS } from "../../utils/const";
import useLocale from "../../hooks/useLocale";

function AddNotePage() {
    const addNote = useFetchState();
    const localeText = useLocale();

    const navigate = useNavigate();
    const newNoteHandler = (note) => {
        addNote.fetchStart();
        Apis.createNote(note)
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    addNote.fetchSuccess(res.data?.message);
                    setTimeout(() => {
                        navigate("/");
                    }, 700);
                    return;
                }
                addNote.fetchFailed(
                    res?.response?.data?.message || localeText("default_error"),
                );
            })
            .catch((err) => {
                addNote.fetchFailed(
                    err?.response?.data?.message || localeText("default_error"),
                );
            });
    };

    return (
        <div className="layout flex flex-col">
            <Navbar href="/" title={localeText("add_new_note")} />
            <FormNote
                loading={addNote.loading}
                onSubmitHandler={newNoteHandler}
            />
            {addNote.error && <Alert text={addNote.error} type={DANGER} />}
            {addNote.data && <Alert text={addNote.data} type={SUCCESS} />}
        </div>
    );
}

export default AddNotePage;
