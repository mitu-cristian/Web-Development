import axios from "axios";
const TICKET_URL = "/url/api/tickets";

const getTicketsSummary = async () => {
    const response = await axios.get(TICKET_URL + "/summary");
    return response.data;
}

const getTicket = async (ticketId) => {
    const response = await axios.get(TICKET_URL + `/${ticketId}`);
    return response.data;
}

const createNewTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(TICKET_URL, ticketData, config);
    return response.data;
};

const getMyTickets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(TICKET_URL + "/user", config);
    return response.data;
}

const closeTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(TICKET_URL + `/${ticketId}`, {status: "closed"}, config);
    return response.data;
}

const ticketService = { getTicketsSummary, createNewTicket, getMyTickets, getTicket, closeTicket };
export default ticketService;