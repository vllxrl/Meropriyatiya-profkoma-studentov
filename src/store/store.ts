import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import eventsReducer from "./slices/eventsSlice.ts"
import ticketsReducer from "./slices/ticketsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        events: eventsReducer,
        tickets: ticketsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;