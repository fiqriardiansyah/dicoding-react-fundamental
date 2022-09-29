import { dicodingClient } from "../config/axios";

class Apis {
    static signup(data) {
        // name, email, password
        return dicodingClient.post("/register", data);
    }

    static signin(data) {
        // email, password
        return dicodingClient.post("/login", data);
    }

    static getUserSignin() {
        return dicodingClient.get("/users/me");
    }

    static createNote(data) {
        // title, body
        return dicodingClient.post("/notes", data);
    }

    static getNotes() {
        return dicodingClient.get("/notes");
    }

    static getArchivedNotes() {
        return dicodingClient.get("/notes/archived");
    }

    static getSingleNote(id) {
        return dicodingClient.get(`/notes/${id}`);
    }

    static archiveNote(id) {
        return dicodingClient.post(`/notes/${id}/archive`);
    }

    static unArchiveNote(id) {
        return dicodingClient.post(`/notes/${id}/unarchive`);
    }

    static deleteNote(id) {
        return dicodingClient.delete(`/notes/${id}`);
    }
}

export default Apis;
