import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => { 
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutSuccess: (state) => {  
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
        deleteUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteAccountSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteAccountFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signOutAccountSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutAccountFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }    
});

export const { 
    signInStart, 
    signInSuccess, 
    signInFailure,
    signOutSuccess,
    deleteUserStart,
    deleteAccountFailure,
    deleteAccountSuccess,
    signOutAccountFailure,
    signOutAccountSuccess,
    signOutUserStart
} = userSlice.actions;

export default userSlice.reducer;