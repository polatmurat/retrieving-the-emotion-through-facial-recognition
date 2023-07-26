import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dominantEmotion: null
};

const changeMoodSlice = createSlice({
    name: 'changeMood',
    initialState,
    reducers: {
        setDominantEmotion: (state, action) => {
            state.dominantEmotion = action.payload;
        },
    },
});

export const { setDominantEmotion } = changeMoodSlice.actions;
export default changeMoodSlice.reducer;