import { ACCESS_TOKEN, LANG_EN, LANG_ID } from "./const";

// locale
import idLocale from "../data/locale/id.json";
import enLocale from "../data/locale/en.json";

const showFormattedDate = ({ date, locale }) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString(locale, options);
};

const filterNotes = ({ query, notes }) => {
    if (!query) return notes;
    return notes.filter(
        (el) =>
            el.title.toLowerCase().includes(query.toLowerCase()) ||
            el.body.toLowerCase().includes(query.toLowerCase()),
    );
};

// eslint-disable-next-line no-shadow
function highlight({ text, sentence }) {
    if (!text) return sentence;
    return sentence
        .toLowerCase()
        .replace(
            text?.toLowerCase(),
            `<span class='bg-yellow-300 text-text-primary m-0 p-0'>${text?.toLowerCase()}</span>`,
        );
}

function getNote(id, notes) {
    const foundedNote = notes.find((note) => note.id === id);
    return foundedNote;
}

function getActiveNotes(notes) {
    const activeNotes = notes.filter((note) => !note.archived);
    return activeNotes;
}

function getArchivedNotes(notes) {
    const archivedNotes = notes.filter((note) => note.archived);
    return archivedNotes;
}

function addNote({ title, body }, notes) {
    return [
        ...notes,
        {
            id: `notes-${+new Date()}`,
            title: title || "(untitled)",
            body,
            createdAt: new Date().toISOString(),
            archived: false,
        },
    ];
}

function editNote({ id, title, body }, notes) {
    return [...notes].map((note) => {
        if (note.id !== id) return note;
        return {
            ...note,
            title: title || "(untitled)",
            body,
            createdAt: new Date().toISOString(),
        };
    });
}

function removeNote({ id, notes }) {
    return notes.filter((note) => note.id !== id);
}

function moveNote({ id, notes }) {
    return notes.map((note) => {
        if (note.id !== id) return note;
        return {
            ...note,
            archived: !note.archived,
        };
    });
}

function signout() {
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = "/";
}

function localeText({ lang, word }) {
    const locales = [
        {
            key: LANG_ID,
            locales: idLocale,
        },
        {
            key: LANG_EN,
            locales: enLocale,
        },
    ];

    const locale = locales.find((lc) => lc.key === lang);
    return Object.keys(locale.locales)
        .map((k) => ({
            [k]: locale.locales[k],
        }))
        .find((lc) => lc[word])[word];
}

export default {
    showFormattedDate,
    filterNotes,
    highlight,
    getNote,
    getActiveNotes,
    getArchivedNotes,
    addNote,
    moveNote,
    removeNote,
    editNote,
    signout,
    localeText,
};
