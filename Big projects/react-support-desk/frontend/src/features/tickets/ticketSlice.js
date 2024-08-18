import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// Tickets summary necessary for the home page
export const getTicketsSummary = createAsyncThunk("tickets/getAll", async(_, thunkAPI) => {
    try {
        return await ticketService.getTicketsSummary();
    }
    catch(error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Create new ticket
export const createTicket = createAsyncThunk("tickets/create", async (ticketData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.createNewTicket(ticketData, token);
    }
    catch(error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get my ticket
export const getMyTickets = createAsyncThunk( "tickets/getMine", async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.getMyTickets(token);
    }
    catch(error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get one ticket
export const getTicket = createAsyncThunk( "/tickets/getTicket", async(ticketId, thunkAPI) => {
    try {
        return await ticketService.getTicket(ticketId);
    }
    catch (error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Close a ticket
export const closeTicket = createAsyncThunk("/tickets/closeTicket", async(ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await ticketService.closeTicket(ticketId, token);
    }
    catch (error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
     }
})

export const ticketSlice = createSlice({
    name: "ticket",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.ticket = {};
            state.tickets = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
        // Tickets summary
        .addCase(getTicketsSummary.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getTicketsSummary.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(getTicketsSummary.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.tickets = action.payload;
        })
        // Create ticket
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
        // Get my tickets
            .addCase(getMyTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMyTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
        // Get a ticket
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
        // Close a ticket
            .addCase(closeTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(closeTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
    }
});

export const selectTicketSlice = (state) => state.ticket;
export const {reset} = ticketSlice.actions;
export default ticketSlice.reducer;