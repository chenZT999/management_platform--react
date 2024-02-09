import { ComponentData, XyDistance } from '@/views/dragPage/config'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface InitialState {
    componentList: ComponentData[],
    movingComponent: ComponentData
    dropAble: boolean
    xyDistance: XyDistance
    editIndex: number
}

const initialState = {
    componentList: [],
    movingComponent: {
        name: '',
    },
    xyDistance: {
        x: 0,
        y: 0
    },
    dropAble: false,
    editIndex: -1
} as InitialState

export const dragComponent = createSlice({
    name: 'dragComponent',
    initialState,
    reducers: {
        // 修改是否可以拖拽编辑
        setDropAble: (state, {payload}: PayloadAction<boolean>)=> {
            state.dropAble = payload
        },

        // 添加或编辑控件
        editComponent: (state, {payload}: PayloadAction<{compItem: ComponentData; index: number}>)=>{
            const {compItem, index} = payload
            console.log(state.dropAble,index,'state.dropAble')
            if(!state.dropAble && state.editIndex===-1) return
            // 编辑
            if(index>=0){
                state.componentList.splice(index, 1, {
                    ...compItem,
                    ...state.xyDistance
                })
            } else {
                // 添加
                state.componentList.push({
                    ...compItem,
                    name: `${compItem.name}_${state.componentList.length+1}`,
                    ...state.xyDistance
                })
            }
        },

        setDistance: (state, {payload}: PayloadAction<XyDistance>) => {
            state.xyDistance = payload
        },

        setEditIndex: (state, {payload}: PayloadAction<number>) => {
            state.editIndex = payload
        },

        changeCompByKey: (state, {payload}: PayloadAction<any>) => {
            const {key, value, key2} = payload
            if(key2){
                state.componentList[state.editIndex][key][key2] = value
            } else {
                state.componentList[state.editIndex][key] = value
            }
        },
    }

})

export const {setDropAble, editComponent, setDistance, setEditIndex, changeCompByKey} = dragComponent.actions
export default dragComponent.reducer