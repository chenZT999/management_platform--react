import DragLeftBox from './DragLeftBox'
import DragMainBox from './middleCanvas/DragMainBox'
import DragRightBox from './DragRightBox'
import RulerRender from '@/views/dragPage/middleCanvas/RulerRender'
import './dragPage.scss'

export default function DragPage() {
    return (
        <div className="flex-top drag-page-box">
            <DragLeftBox />
            <div className='middle-box'>
                <DragMainBox />
                <div className='ruler-x'>
                    <RulerRender id="rulerX" direction='h' scale={1} label-color="rgb(112,156,218)" offset={0}/>
                </div>
                
                <div className='ruler-y'>
                    <RulerRender id="rulerY" direction='v' scale={1} label-color="rgb(112,156,218)" offset={0}/>
                </div>
            </div>
            <DragRightBox />
        </div>
    )
}