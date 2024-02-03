import './topHeader.scss'
import userHead from '../../assets/imgs/head.jpg'
import { useState } from 'react'
export default function TopHeader(){
    const getTime=()=> {
        return new Date().toLocaleString(undefined, {
            dateStyle: "full",
            timeStyle: "short",
        })
    }
    const [todayTime, setTodayTime] = useState(getTime())
    setInterval(()=>{
        const time = getTime()
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