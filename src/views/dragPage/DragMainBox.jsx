import { useState } from 'react'
import './dragMainBox.scss'
// import {throttle} from 'loadsh'

export default function DragMainBox() {
    // const [xyClient, setXyClient] = useState({x: 0, y: 0})

    function onDragEnd($event) {
        const componentData = $event.dataTransfer.getData('component')
        console.log(componentData,'componentData')
    }

    function onDragOver($event) {
        $event.preventDefault()
        const {left, top} = $event.currentTarget.getBoundingClientRect()
        const compX = $event.clientX - left
        const compY = $event.clientY - top
        console.log(compX, compY,'left, top')
    }

    function onMouseMove($event) {
    }

    return (
        <div className='drag-main-box' draggable onDragOver={onDragOver} onDragEnd={onDragEnd} onMouseMove={onMouseMove}>1</div>
    )
}