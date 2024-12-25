import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Event, T_EventsFilters, T_Ticket} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_EventsSlice = {
    draft_event_id: number | null,
    tickets_count: number | null,
    event: T_Event | null,
    events: T_Event[],
    filters: T_EventsFilters,
    save_mm: boolean
}

const initialState:T_EventsSlice = {
    draft_event_id: null,
    tickets_count: null,
    event: null,
    events: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchEvent = createAsyncThunk<T_Event, string, AsyncThunkConfig>(
    "events/event",
    async function(event_id) {
        const response = await api.events.eventsRead(event_id) as AxiosResponse<T_Event>
        return response.data
    }
)

export const fetchEvents = createAsyncThunk<T_Event[], object, AsyncThunkConfig>(
    "events/events",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.events.eventsList({
            status: state.events.filters.status,
            date_formation_start: state.events.filters.date_formation_start,
            date_formation_end: state.events.filters.date_formation_end
        }) as AxiosResponse<T_Event[]>

        return response.data.filter(event => event.owner.includes(state.events.filters.owner))
    }
)

export const removeTicketFromDraftEvent = createAsyncThunk<T_Ticket[], string, AsyncThunkConfig>(
    "events/remove_ticket",
    async function(ticket_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.events.eventsDeleteTicketDelete(state.events.event.id, ticket_id) as AxiosResponse<T_Ticket[]>
        return response.data
    }
)

export const deleteDraftEvent = createAsyncThunk<void, object, AsyncThunkConfig>(
    "events/delete_draft_event",
    async function(_, {getState}) {
        const state = getState()
        await api.events.eventsDeleteDelete(state.events.event.id)
    }
)

export const sendDraftEvent = createAsyncThunk<void, object, AsyncThunkConfig>(
    "events/send_draft_event",
    async function(_, {getState}) {
        const state = getState()
        await api.events.eventsUpdateStatusUserUpdate(state.events.event.id)
    }
)

export const updateEvent = createAsyncThunk<void, object, AsyncThunkConfig>(
    "events/update_event",
    async function(data, {getState}) {
        const state = getState()
        await api.events.eventsUpdateUpdate(state.events.event.id, {
            ...data
        })
    }
)

export const updateTicketValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "events/update_mm_value",
    async function({ticket_id, count},thunkAPI) {
        const state = thunkAPI.getState()
        await api.events.eventsUpdateTicketUpdate(state.events.event.id, ticket_id, {count})
    }
)

export const acceptEvent = createAsyncThunk<void, string, AsyncThunkConfig>(
    "events/accept_event",
    async function(event_id,{dispatch}) {
        await api.events.eventsUpdateStatusAdminUpdate(event_id, {status: 3})
        await dispatch(fetchEvents)
    }
)

export const rejectEvent = createAsyncThunk<void, string, AsyncThunkConfig>(
    "events/accept_event",
    async function(event_id,{dispatch}) {
        await api.events.eventsUpdateStatusAdminUpdate(event_id, {status: 4})
        await dispatch(fetchEvents)
    }
)

const eventsSlice = createSlice({
    name: 'events',
    initialState: initialState,
    reducers: {
        saveEvent: (state, action) => {
            state.draft_event_id = action.payload.draft_event_id
            state.tickets_count = action.payload.tickets_count
        },
        removeEvent: (state) => {
            state.event = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEvent.fulfilled, (state:T_EventsSlice, action: PayloadAction<T_Event>) => {
            state.event = action.payload
        });
        builder.addCase(fetchEvents.fulfilled, (state:T_EventsSlice, action: PayloadAction<T_Event[]>) => {
            state.events = action.payload
        });
        builder.addCase(removeTicketFromDraftEvent.rejected, (state:T_EventsSlice) => {
            state.event = null
        });
        builder.addCase(removeTicketFromDraftEvent.fulfilled, (state:T_EventsSlice, action: PayloadAction<T_Ticket[]>) => {
            if (state.event) {
                state.event.tickets = action.payload as T_Ticket[]
            }
        });
        builder.addCase(sendDraftEvent.fulfilled, (state:T_EventsSlice) => {
            state.event = null
        });
    }
})

export const { saveEvent, removeEvent, triggerUpdateMM, updateFilters } = eventsSlice.actions;

export default eventsSlice.reducer