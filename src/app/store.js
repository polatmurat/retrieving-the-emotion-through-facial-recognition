import { configureStore } from '@reduxjs/toolkit';
import moodReducer from '../features/changeMoodSlice';

export const store = configureStore({
    reducer: {
        changeMood: moodReducer,
    },
});

export default store;