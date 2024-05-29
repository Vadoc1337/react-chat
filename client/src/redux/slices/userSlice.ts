import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserState} from "../../../client_declarations";
import {RootState} from "../store";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loggedIn: null as boolean | null
    },
    reducers: {
        setUser: (state, action: PayloadAction<IUserState>) => {
            state.loggedIn = action.payload.loggedIn;
        },
    },
});

export const selectUser = (state: RootState): IUserState =>
    state.user;

export const {setUser} = userSlice.actions;


export default userSlice.reducer;