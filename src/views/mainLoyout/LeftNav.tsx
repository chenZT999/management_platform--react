import { useMemo, useState } from "react"
import './leftNav.scss'

export default function LeftNav(){
    const [showNav, setShowNav] = useState(true)
    const boxStyle = useMemo(()=>{
        return {
            width: '300px'
        }
    }, [showNav])
    return (
        <div className="left-nav-box" style={boxStyle}>左侧导航栏</div>
    )
}