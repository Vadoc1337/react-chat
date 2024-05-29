import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import {IMessagesSlice} from "../../../client_declarations";


export const messagesSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [] as IMessagesSlice[]
    },
    reducers: {
        setMessages: (state, action: PayloadAction<IMessagesSlice>) => {
            state.messages.unshift(action.payload);
        },
    },
});

export const selectMessage = (state: RootState): IMessagesSlice[] =>
    state.message.messages;

export const {setMessages} = messagesSlice.actions;

export default messagesSlice.reducer;