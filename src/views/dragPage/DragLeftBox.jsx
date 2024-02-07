import './dragLeftBox.scss'
import { allFromComponent } from './config'

export default function DragLeftBox() {
    function onDragComponent($event, item) {
        console.log('开始拖拽')
        if($event.dataTransfer) {
            $event.dataTransfer.setData('component', item)
        }
    }

    return (
        <div className='drag-left-box'>
            {
                allFromComponent.map((item, index) => {
                    return (
                        <div className='component-item' key={index} draggable onDragStart={($event)=>onDragComponent($event, item)}>
                            {item.name}
                        </div>
                    )
                })
            }
        </div>
    )
}