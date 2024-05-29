import {configureStore} from '@reduxjs/toolkit';
import user from './slices/userSlice';
import colleague from './slices/colleagueListSlice';
import message from './slices/messagesSlice';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        user,
        colleague,
        message
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;