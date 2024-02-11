import { useState } from 'react'
import './dragLeftBox.scss'
import { allFromComponent, ComponentData } from './config'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {editComponent} from '@/store/dragComponent'

export default function DragLeftBox() {
    const useDispatch = useAppDispatch()

    const [movingComp, setMovingComp] = useState({
        name: ''
    })

    // 开始拖拽
    function handleDragComponent(item) {
        setMovingComp(item)
    }

    function handleDragEnd() {
        useDispatch(editComponent({compItem: movingComp}))
    }

    return (
        <div className='drag-left-box'>
            <div className='tip'>可拖动下面控件至灰色区域</div>
            {
                allFromComponent.map((item, index) => {
                    return (
                        <div className='component-item' key={index} draggable onDragStart={()=>handleDragComponent(item)} onDragEnd={handleDragEnd}>
                            {item.name}
                        </div>
                    )
                })
            }
        </div>
    )
}