import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    password: null,
    amount: 0
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setAmount: (state, action) => {
            state.amount = action.payload
        }
    }
})

export const { setUsername, setPassword, setAmount } = userSlice.actions
export default userSlice.reducer