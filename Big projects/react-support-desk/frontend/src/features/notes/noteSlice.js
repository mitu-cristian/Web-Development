import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// Get all notes
export const getAllNotesForTicket = createAsyncThunk("notes/getAllForTicket", async (ticketId, thunkAPI) => {
    try {
        return await noteService.getAllNotesForTicket(ticketId);
    }
    catch(error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// User adds a note
export const createNote = createAsyncThunk ("notes/create", async({noteText, ticketId}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await noteService.createNote(noteText, ticketId, token);
    }
    catch (error) {
        const message = error?.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const noteSlice = createSlice({
    name: "note",
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.notes = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
        // Get all notes for a ticket
            .addCase(getAllNotesForTicket.pending, (state) => {
                state.isLoading = true;
            })
           .addCase(getAllNotesForTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
           }) 
           .addCase(getAllNotesForTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
           })
        // Create a note
           .addCase(createNote.pending, (state) => {
                state.isLoading = true;
           })
           .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
           })
           .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes.push(action.payload);
           })
    }
});

export const selectNoteSlice = (state) => state.note;
export const {reset} = noteSlice.actions;
export default noteSlice.reducer;

