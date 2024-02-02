import './topHeader.scss'
import userHead from '../../assets/imgs/head.jpg'
import { useState } from 'react'
export default function TopHeader(){
    const [todayTime, setTodayTime] = useState('')
    setInterval(()=>{
        const time = new Date().toLocaleString(undefined, {
            dateStyle: "full",
            timeStyle: "short",
        })
        setTodayTime(time)
    }, 1000 * 30)
    

    return (
        <div className="top-header-box flex-end-middle">
            {todayTime}
            <img src={userHead} alt="" className='user-avatar'/>
            欢迎少爷上线
        
        </div>
    )
}