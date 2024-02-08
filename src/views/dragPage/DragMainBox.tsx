import { useEffect, useRef, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store/hooks.ts'
import {setDropAble} from '@/store/dragComponent.ts'
import './dragMainBox.scss'

import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import { changeCompByKey, editComponent, setDistance, setEditIndex } from '@/store/dragComponent'
import { ComponentData } from './config'
import {throttle} from '@/utils/myFunction'


let throttleTime = 0
let moveOldDistance = {
    x: 0,
    y: 0
}
export default function DragMainBox() {
    const useDispatch = useAppDispatch()
    const componentList = useAppSelector(state=>state.dragComponent.componentList)


    function handleDrag(flag: boolean) {
        useDispatch(setDropAble(flag))
    }

    const handleDragOver = (event)=>{
        event.preventDefault()
        const timestamp = new Date().getTime()
        if(!throttleTime || timestamp-throttleTime>100) { // 节流
            throttleTime = new Date().getTime()
            if(!event.currentTarget) return
            const {left, top} = event.currentTarget.getBoundingClientRect()
            const compX = event.clientX - left
            const compY = event.clientY - top
            useDispatch(setDistance({
                x: compX,
                y: compY
            }))
        }
    } 

    
    // 判断渲染的控件
    function renderComponent(item: ComponentData) {
        switch (item.component) {
            case 'MyButton':
                return <MyButton  />
            case 'MyInput':
                return <MyInput  />
            default:
                return <div>暂无此控件</div>
        }
    }

    function getStyle(item: ComponentData) {
        return {
            transform: `translate(${item.x}px, ${item.y}px)`
        }
    }

    // ---------------------------------------------------------------- 移动某个控件 start
    useEffect(()=>{
        window.addEventListener('mousemove', throttleMove)
        return ()=>{
            window.removeEventListener('mousemove', throttleMove)
        }
    })
    const throttleMove = throttle(getOldMoveInstance, 1000)
    function getOldMoveInstance(event) {
        if(!isMovingOld) return 
        const {clientX, clientY} = event
        const {x, y} = moveOldDistance
        const diffX = clientX - x
        const diffY = clientY - y
        console.log(clientX,x,diffX, diffY)
        moveOldDistance = {
            x: event.clientX,
            y: event.clientY,
        }
        const currentComp = componentList[editIndex]
        useDispatch(changeCompByKey({key: 'x', value: (currentComp.x+diffX)}))
        useDispatch(changeCompByKey({key: 'y', value: (currentComp.y+diffY)}))
    }

    const [movingComp, setMovingComp] = useState({
        name: ''
    })
    const editIndex = useAppSelector((state) => state.dragComponent.editIndex)

    const [isMovingOld, setIsMovingOld] = useState(false)
    // 开始拖拽
    function handleMouseDown(event: MouseEvent, item, index: number) {
        useDispatch(setEditIndex(index))
        // useDispatch(setDropAble(true))
        console.log('开始')
        setIsMovingOld(true)
        moveOldDistance = {
            x: event.clientX,
            y: event.clientY
        }
        setMovingComp(item)
    }

    function handleMouseUp() {
        setIsMovingOld(false)
        // useDispatch(editComponent({compItem: movingComp, index: editIndex}))
    }



    return (
        <div className='drag-main-box' onDragOver={handleDragOver} onDragLeave={()=>handleDrag(false)} onDragEnter={()=>handleDrag(true)}  >
            {
                componentList.map((compItem, index) => {
                    return (
                        <div key={index} className="component-item flex-center" style={getStyle(compItem)} 
                            onMouseDown={(e)=>handleMouseDown(e,compItem, index)} onMouseUp={handleMouseUp}>
                            {compItem.name}:  {renderComponent(compItem)}
                        </div>
                    )
                })
            }
        </div>
    )
}

