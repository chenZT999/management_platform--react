import {createSlice} from '@reduxjs/toolkit'
import userHead from '@img/head.jpg'
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
    avatar: userHead,
    menu: [
        {
            name: '功能',
            children: [
                {
                    name: '拖拽控件',
                    path: '/dragPage'
                }, {
                    name: '笔记本',
                    path: '/notesApp'
                }
            ]
        }, {
            name: '表单',
            children: [
                {
                    name: '表单控件',
                    path: '/formPage'
                }, {
                    name: '测试',
                    path: '/eventTest'
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