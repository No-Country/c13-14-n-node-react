import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toggle: false
}

const toggleState = createSlice({
    name: 'toggle',
    initialState,
    reducers: {
        setToggle: (state, action) => {
            state.toggle = action.payload
        }
    }
})


export const { setToggle } = toggleState.actions
export default toggleState.reducer