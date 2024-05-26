import {configureStore} from '@reduxjs/toolkit';
import user from './slices/userSlice';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        user,
    },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;