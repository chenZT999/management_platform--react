import {createSlice} from '@reduxjs/toolkit'
interface InitialState {
    count: number
}
const initialState: InitialState = {
    count: 0
}
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count++
        }
    }
})

export const {increment} = counterSlice.actions
export default counterSlice.reducer