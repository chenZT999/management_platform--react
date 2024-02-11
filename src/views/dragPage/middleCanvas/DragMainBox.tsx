
import { useAppSelector, useAppDispatch } from '@/store/hooks.ts'
import {setDropAble} from '@/store/dragComponent.ts'
import './dragMainBox.scss'

import { setDistance, setEditIndex } from '@/store/dragComponent'
import ComponentItem from './ComponentItem'
import { useMemo } from 'react'


let throttleTime = 0
export default function DragMainBox() {
    const useDispatch = useAppDispatch()
    const componentList = useAppSelector(state=>state.dragComponent.componentList)
    const editIndex = useAppSelector(state=>state.dragComponent.editIndex)

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

    function getBoundStyle() {
        const {form} = useAppSelector(state=>state.dragComponent.canvasSetting)
        return {
            width: form.width + 'px',
            height: form.height + 'px'
        }
    }

    function handleCanvasClick(event) {
        if (event.target === event.currentTarget) {  
            useDispatch(setEditIndex(-1))
        }
    }

    const lineObj = useMemo(()=>{
        if(editIndex==-1) return
        const currentComp = componentList[editIndex]
        const {x, y, width, height} = currentComp.form
        return {
            top: {
                top: y-1+'px'
            },
            left: {
                left: x-1+'px'
            },
            bottom: {
                top: y+height+'px'
            },
            right: {
                left: x+width+'px'
            },
        }
    }, [componentList, editIndex])
    

    return (
        <div className='drag-main-box' style={getBoundStyle()} onDragOver={handleDragOver} onDragLeave={()=>handleDrag(false)} onDragEnter={()=>handleDrag(true)}  
            onClick={handleCanvasClick}>
            {
                componentList.map((compItem, index) => {
                    return <ComponentItem key={index} index={index} compItem={compItem} />
                })
            }
            
            {
                editIndex!==-1?
                <div>
                    <div className='line line-top' style={lineObj.top}></div>
                    <div className='line line-bottom' style={lineObj.bottom}></div>
                    <div className='line line-left' style={lineObj.left}></div>
                    <div className='line line-right' style={lineObj.right}></div>
                </div>
                : <div />
            }
        </div>
    )
}

