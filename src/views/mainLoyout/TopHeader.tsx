import './topHeader.scss'
import { useState } from 'react'
import { useSelector } from 'react-redux'

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
    
    const userInfo = useSelector((state)=>state.userInfo)

    return (
        <div className="top-header-box flex-end-middle">
            {todayTime}
            <img src={userInfo.avatar} alt="" className='user-avatar'/>
            欢迎{userInfo.userName}上线
        
        </div>
    )
}