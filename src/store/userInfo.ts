import {createSlice} from '@reduxjs/toolkit'
interface InitialState {
    userName: string
    avatar: string
    menu: Menu[]
}

export interface Menu {
    name: string
    path?: string
    element?: string
    children?: Menu[]
    show?: boolean
}


const initialState: InitialState = {
    userName: '大少爷',
    avatar: '',
    menu: [
        {
            name: '功能',
            children: [
                {
                    name: '笔记本',
                    path: '/notesApp'
                }, {
                    name: '笔记本2',
                    path: '/notesApp'
                }
            ]
        }, {
            name: '表单',
            children: [
                {
                    name: '笔记本',
                    path: '/notesApp'
                }, {
                    name: '笔记本2',
                    path: '/notesApp'
                }
            ]
        }
    ]
}
export const counterSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        
    }
})

// export const {increment} = counterSlice.actions
export default counterSlice.reducer