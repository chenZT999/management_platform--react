import {useMemo} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from '@/views/login/login.tsx'
import MainPage from '@/views/mainLoyout/MainPage.tsx'
import { useSelector} from 'react-redux'
import allRoutes from './views/router.tsx'

export default function App() {
    // 从个人信息获取路由权限
    const menuList = useSelector((state) => state.userInfo.menu)

    // 扁平化路由
    const getUserMenu = (list=menuList, result=[])=>{
        // const result = []
        list.forEach((route) => {
            if(route.children) {
                getUserMenu(route.children, result)
            } else {
                console.log(result,'result')
                const index = result.findIndex(item => item.path === route.path)
                if(index===-1) {
                    const findRoute = allRoutes.find(r=>r.path === route.path)
                    if(findRoute){
                        result.push(findRoute)
                    } else {
                        console.log('路由不存在')
                    }
                }
            }
        });
        return result
    }

    

    // 通过权限设置动态添加路由
    const mainChildren = useMemo(()=>{
        const userMenu = getUserMenu()
        if(userMenu && userMenu.length) {
            userMenu.unshift({
                path: '/',
                element: userMenu[0].element
            })
            return userMenu
        } else {
            return allRoutes
        }
    }, [menuList])

    const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        children: mainChildren
    },
    {
        path: '/login',
        element: <Login />
    },
    ])

    return (
        <RouterProvider router={router} />
    )
} 