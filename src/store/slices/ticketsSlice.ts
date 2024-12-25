import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Ticket, T_TicketAddData, T_TicketsListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveEvent} from "store/slices/eventsSlice.ts";
import {Ticket} from "src/api/Api.ts";

type T_TicketsSlice = {
    ticket_name: string
    ticket: null | T_Ticket
    tickets: T_Ticket[]
}

const initialState:T_TicketsSlice = {
    ticket_name: "",
    ticket: null,
    tickets: []
}

export const fetchTicket = createAsyncThunk<T_Ticket, string, AsyncThunkConfig>(
    "fetch_ticket",
    async function(id) {
        const response = await api.tickets.ticketsRead(id) as AxiosResponse<T_Ticket>
        return response.data
    }
)

export const fetchTickets = createAsyncThunk<T_Ticket[], object, AsyncThunkConfig>(
    "fetch_tickets",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.tickets.ticketsList({
            ticket_name: state.tickets.ticket_name
        }) as AxiosResponse<T_TicketsListResponse>

        thunkAPI.dispatch(saveEvent({
            draft_event_id: response.data.draft_event_id,
            tickets_count: response.data.tickets_count
        }))

        return response.data.tickets
    }
)

export const addTicketToEvent = createAsyncThunk<void, string, AsyncThunkConfig>(
    "tickets/add_ticket_to_event",
    async function(ticket_id) {
        await api.tickets.ticketsAddToEventCreate(ticket_id)
    }
)

export const deleteTicket = createAsyncThunk<T_Ticket[], string, AsyncThunkConfig>(
    "delete_ticket",
    async function(ticket_id) {
        const response = await api.tickets.ticketsDeleteDelete(ticket_id) as AxiosResponse<T_Ticket[]>
        return response.data
    }
)

export const updateTicket = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_ticket",
    async function({ticket_id, data}) {
        await api.tickets.ticketsUpdateUpdate(ticket_id as string, data as Ticket)
    }
)

export const updateTicketImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_ticket_image",
    async function({ticket_id, data}) {
        await api.tickets.ticketsUpdateImageCreate(ticket_id as string, data as {image?: File})
    }
)

export const createTicket = createAsyncThunk<void, T_TicketAddData, AsyncThunkConfig>(
    "update_ticket",
    async function(data) {
        await api.tickets.ticketsCreateCreate(data)
    }
)

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: initialState,
    reducers: {
        updateTicketName: (state, action) => {
            state.ticket_name = action.payload
        },
        removeSelectedTicket: (state) => {
            state.ticket = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickets.fulfilled, (state:T_TicketsSlice, action: PayloadAction<T_Ticket[]>) => {
            state.tickets = action.payload
        });
        builder.addCase(fetchTicket.fulfilled, (state:T_TicketsSlice, action: PayloadAction<T_Ticket>) => {
            state.ticket = action.payload
        });
        builder.addCase(deleteTicket.fulfilled, (state:T_TicketsSlice, action: PayloadAction<T_Ticket[]>) => {
            state.tickets = action.payload
        });
    }
})

export const { updateTicketName, removeSelectedTicket} = ticketsSlice.actions;

export default ticketsSlice.reducer