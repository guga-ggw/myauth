import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
};



const userSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        setLoggedIn : (state) => {
            state.isLoggedIn = !state.isLoggedIn
        },
        
    },
});

export const {setLoggedIn} = userSlice.actions
export default userSlice.reducer;