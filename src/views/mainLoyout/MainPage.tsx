import TopHeader from './TopHeader'
import LeftNav from './leftNav'
import App from '@/views/notesApp/Index.tsx'
import './mainPage.scss'
export default function MainPage() {
    return (
        <div className='main-page-box'>
            <TopHeader />
            <div className='flex-top bottom-box'>
                <div>
                    <LeftNav></LeftNav>
                </div>
                <div>
                    <App />
                </div>
            </div>
        </div>
    )
} 