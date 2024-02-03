import { Menu } from "@/store/userInfo"
import { RightOutlined } from "@ant-design/icons"
import { useMemo, useState } from "react"
import { useSelector} from 'react-redux'
import './leftNav.scss'
import { useNavigate } from "react-router-dom";

export default function LeftNav(){
    const menuList = useSelector((state) => state.userInfo.menu)
    
    const [showNav, setShowNav] = useState(true)
    const boxStyle = useMemo(()=>{
        return {
            width: '250px'
        }
    }, [showNav])
    return (
        <div className="left-nav-box" style={boxStyle}>
            <NavList menuList={menuList} cell={1}/>
        </div>
    )
}

function NavList({menuList, cell}: {menuList?: Menu[], cell: number}) {
    const backgroundList = [
        'linear-gradient(160deg, rgb(104,97,204), rgb(85,120,210)', 
        'rgba(100,100,210,.0)'
    ]
    const fontColor = [
        '#fff', '#333'
    ]
    const navStyle = {
        padding: `0 18px 0 ${cell*18}px`,
        background:  backgroundList[cell-1],
        color: fontColor[cell-1],
    }

    const navigate = useNavigate();
    const onNavigate =(navData: Menu)=>{
        if(navData.path) {
            navigate(navData.path)
        }
    }

    return (
        <>
            {
                menuList && menuList.map((item, index)=>{
                    return (
                        <div key={index} onClick={()=>onNavigate(item)}>
                            <div className="nav-item between-center" style={navStyle}>
                                <div>{item.name}</div>
                                {
                                    item.children && <RightOutlined />
                                }
                                
                            </div>
                            <NavList menuList={item.children} cell={cell+1}/>
                        </div>
                    )
                })
            }
        </>
    )
}