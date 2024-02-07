import DragLeftBox from './DragLeftBox'
import DragMainBox from './DragMainBox'
import DragRightBox from './DragRightBox'
import './dragPage.scss'

export default function DragPage() {
    return (
        <div className="flex-top drag-page-box">
            <DragLeftBox />
            <DragMainBox />
            <DragRightBox />
        </div>
    )
}