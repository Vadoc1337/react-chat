import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserState} from "../../../client_declarations";
import {RootState} from "../store";
import Cookies from 'js-cookie'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: Cookies.get('logged') === 'true' || false
        // token: localStorage.getItem('token'),
    },
    reducers: {
        setUser: (state, action: PayloadAction<IUserState>) => {
            state.loggedIn = action.payload.loggedIn;
            Cookies.set('logged', action.payload.loggedIn.toString(), {expires: 3, sameSite: 'Strict',secure: true });
            // state.token = action.payload.token;
        },
    },
});


export const selectUser = (state: RootState): IUserState =>
    state.user;

export const checkLoggedIn = (state: RootState): boolean =>
    state.user.loggedIn;

export const {setUser} = userSlice.actions;


export default userSlice.reducer;