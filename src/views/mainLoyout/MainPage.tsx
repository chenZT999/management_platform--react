import TopHeader from './TopHeader'
import LeftNav from './LeftNav'
import './mainPage.scss'
import { Outlet } from "react-router-dom";
export default function MainPage() {
    return (
        <div className='main-page-box'>
            <TopHeader />
            <div className='flex-top bottom-box'>
                <LeftNav></LeftNav>
                <div className='outlet-box'>
                    <Outlet />11
                </div>
            </div>
        </div>
    )
} 