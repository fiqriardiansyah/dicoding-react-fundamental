import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ACTIVE_MENU, ARCHIVE_MENU } from "./utils/const";
import utils from "./utils";
import NotesDefault from "./data";

// pages
import AllNotesPage from "./pages/all-notes";
import ArchivedNotesPage from "./pages/archived-notes";
import ActiveNotesPage from "./pages/active-notes";
import NotePage from "./pages/note";
import NotFoundPage from "./pages/404";
import AddNotePage from "./pages/add";
import EditNotePage from "./pages/edit";

function App() {
    const [notes, setNotes] = useState(NotesDefault);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<AllNotesPage notes={notes} setNotes={setNotes} />}
                />
                <Route
                    path={`/${ARCHIVE_MENU}`}
                    element={
                        <ArchivedNotesPage
                            notes={utils.getArchivedNotes(notes)}
                            setNotes={setNotes}
                        />
                    }
                />
                <Route
                    path={`/${ACTIVE_MENU}`}
                    element={
                        <ActiveNotesPage
                            notes={utils.getActiveNotes(notes)}
                            setNotes={setNotes}
                        />
                    }
                />
                <Route
                    path="/note/:id"
                    element={<NotePage notes={notes} setNotes={setNotes} />}
                />
                <Route
                    path="/edit/:id"
                    element={<EditNotePage notes={notes} setNotes={setNotes} />}
                />
                <Route
                    path="/new"
                    element={<AddNotePage setNotes={setNotes} />}
                />
                <Route path="/*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
