import { createSlice } from "@reduxjs/toolkit";

const initialState = "hello"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        changeMessage(state, action) {
            return state = action.payload
        }
    }
})

export const { changeMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(changeMessage(message))
        setTimeout(() => {
            dispatch(changeMessage("hello"))
        }, time * 1000)
    }
}

export default notificationSlice.reducer