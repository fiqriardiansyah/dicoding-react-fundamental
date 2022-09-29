import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ACTIVE_MENU, ARCHIVE_MENU } from "./utils/const";

// context
import { UserContext } from "./context/user";

// pages
import AllNotesPage from "./pages/notes/all-notes";
import ArchivedNotesPage from "./pages/notes/archived-notes";
import ActiveNotesPage from "./pages/notes/active-notes";
import NotePage from "./pages/notes/note";
import AddNotePage from "./pages/notes/add";
// auth pages
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";

function App() {
    const { user } = useContext(UserContext);

    return (
        <BrowserRouter>
            {user.accessToken ? (
                <Routes>
                    <Route path="/" element={<AllNotesPage />} />
                    <Route
                        path={`/${ARCHIVE_MENU}`}
                        element={<ArchivedNotesPage />}
                    />
                    <Route
                        path={`/${ACTIVE_MENU}`}
                        element={<ActiveNotesPage />}
                    />
                    <Route path="/note/:id" element={<NotePage />} />
                    <Route path="/new" element={<AddNotePage />} />
                    <Route path="/*" element={<Navigate to="/" replace />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="*" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
