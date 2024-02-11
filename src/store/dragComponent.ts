import { ComponentData, SettingData, XyDistance } from '@/views/dragPage/config'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface DragComponentState {
    componentList: ComponentData[],
    movingComponent: ComponentData
    dropAble: boolean
    xyDistance: XyDistance
    editIndex: number
    canvasSetting: SettingData
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
    editIndex: -1,
    canvasSetting: {
        options: [
            {
                name: '画布宽度',
                component: 'MyInputNumber',
                key: 'width',
                prop: {
                    min: 1,
                    max: 1920 
                }
            }, {
                name: '画布高度',
                component: 'MyInputNumber',
                key: 'height',
            }
        ],
        form: {
            width: 1100,
            height: 800
        }
    }
} as DragComponentState

export const dragComponent = createSlice({
    name: 'dragComponent',
    initialState,
    reducers: {
        // 修改是否可以拖拽编辑
        setDropAble: (state, {payload}: PayloadAction<boolean>)=> {
            state.dropAble = payload
        },

        // 添加或编辑控件
        editComponent: (state, {payload}: PayloadAction<{compItem: ComponentData}>)=>{
            const {compItem} = payload
            console.log(state.dropAble,'state.dropAble')
            if(!state.dropAble && state.editIndex===-1) return
            // 添加
            state.componentList.push({
                ...compItem,
                name: `${compItem.name}_${state.componentList.length+1}`,
                form: {
                    ...compItem.form,
                    ...state.xyDistance
                }
            })
            state.editIndex = state.componentList.length-1
        },

        setDistance: (state, {payload}: PayloadAction<XyDistance>) => {
            state.xyDistance = payload
        },

        setEditIndex: (state, {payload}: PayloadAction<number>) => {
            state.editIndex = payload
        },

        // 改变设置
        changeCompByKey: (state, {payload}: PayloadAction<any>) => {
            let {key, value} = payload
            if(state.editIndex===-1){
                // 改变画布配置
                state.canvasSetting.form![key] = value
                return 
            }
            // 拖动位置不可超出画布
            const {height, width} = state.canvasSetting.form!
            const maxHeight = Number(height)-100
            const maxWidth = Number(width)-100
            if(key==='y'){
                if(value<0) value=0
                if(value>maxHeight) value=maxHeight
            } else if(key==='x'){
                if(value<0) value=0
                if(value>maxWidth) value=maxWidth
            }
            state.componentList[state.editIndex].form![key] = value
        },
    }

})

export const {setDropAble, editComponent, setDistance, setEditIndex, changeCompByKey} = dragComponent.actions
export default dragComponent.reducer