import { useEffect, useRef, useCallback } from 'react'
import { changeCompByKey, editComponent, setEditIndex } from '@/store/dragComponent'
import { ComponentData } from './config'
import {throttle} from '@/utils/myFunction'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import MyButton from '@/components/MyButton'
import MyInput from '@/components/MyInput'
import { useMemo } from 'react'
import { MouseEventHandler } from 'react'


let moveOldDistance = {
    x: 0,
    y: 0
}

export default function ComponentItem({index, compItem}) {
    const useDispatch = useAppDispatch()

    // 判断渲染的控件
    function renderComponent() {
        switch (compItem.component) {
            case 'MyButton':
                return <MyButton  />
            case 'MyInput':
                return <MyInput  />
            default:
                return <div>暂无此控件</div>
        }
    }

    function getStyle() {
        const {x, y} = compItem
        return {
            transform: `translate(${x}px, ${y}px)`
        }
    }

    useEffect(()=>{
        window.addEventListener('mousemove', getOldMoveInstance)
        window.addEventListener('mouseup', handleMouseUp)
        return ()=>{
            window.removeEventListener('mousemove', getOldMoveInstance)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    })
    const throttleTime = useRef(0)
    // const throttleMove = throttle(getOldMoveInstance)
    
    // 获取移动距离
    function getOldMoveInstance(event) {
        if(!isMovingOld.current) return 
        const now = new Date().getTime()
        if(throttleTime.current && now-throttleTime.current<=50) return
        throttleTime.current = now
        const {clientX, clientY} = event
        const {x, y} = moveOldDistance
        const diffX = clientX - x
        const diffY = clientY - y
        moveOldDistance = {
            x: event.clientX,
            y: event.clientY,
        }
        useDispatch(changeCompByKey({key: 'x', value: (compItem.x+diffX)}))
        useDispatch(changeCompByKey({key: 'y', value: (compItem.y+diffY)}))
    }


    const isMovingOld = useRef(false)
    // 开始拖拽
    function handleMouseDown(event) {
        event.preventDefault()
        useDispatch(setEditIndex(index))
        isMovingOld.current = true
        moveOldDistance = {
            x: event.clientX,
            y: event.clientY
        }
    }

    // 结束拖拽
    function handleMouseUp() {
        isMovingOld.current = false 
    }


    return (
        <div key={index} className="component-item flex-center" style={getStyle()} 
            onMouseDown={handleMouseDown} >
            {compItem.form.title}:  {renderComponent()}
        </div>
    )
}