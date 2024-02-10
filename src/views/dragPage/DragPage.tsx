import DragLeftBox from './DragLeftBox'
import DragMainBox from './middleCanvas/DragMainBox'
import DragRightBox from './DragRightBox'
import './dragPage.scss'

export default function DragPage() {
    return (
        <div className="flex-top drag-page-box">
            <DragLeftBox />
            <div className='middle-box'>

                <DragMainBox />
            </div>
            <DragRightBox />
        </div>
    )
}