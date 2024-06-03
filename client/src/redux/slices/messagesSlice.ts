import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import {IMessage} from "../../../client_declarations"; // Renamed for clarity

export const messagesSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [] as IMessage[]
    },
    reducers: {
        addMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },
        setInitialMessages: (state, action: PayloadAction<IMessage[]>) => {
            state.messages = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    },
});

export const selectMessage = (state: RootState): IMessage[] =>
    state.message.messages;

export const {addMessage, setInitialMessages, clearMessages} = messagesSlice.actions;

export default messagesSlice.reducer;