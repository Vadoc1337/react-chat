import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import {IColleaguesSlice} from "../../../client_declarations";

export const colleagueListSlice = createSlice({
    name: 'colleague',
    initialState: {
        colleagues: [] as IColleaguesSlice[]
    },
    reducers: {
        setColleagueList: (state, action: PayloadAction<IColleaguesSlice[]>) => {
            state.colleagues = action.payload
        },
    },
});

export const selectColleague = (state: RootState): IColleaguesSlice[] =>
    state.colleague.colleagues;

export const {setColleagueList} = colleagueListSlice.actions;

export default colleagueListSlice.reducer;