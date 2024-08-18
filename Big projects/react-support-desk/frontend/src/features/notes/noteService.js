import axios from "axios";
const NOTE_URL = "/url/api/tickets/";

const getAllNotesForTicket = async (ticketId) => {
    const response = await axios.get(NOTE_URL + ticketId + "/notes");
    return response.data;
}

const createNote = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(NOTE_URL + ticketId + "/notes", {text: noteText}, config);
    return response.data;
}

const noteService = {getAllNotesForTicket, createNote};
export default noteService;