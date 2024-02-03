import {useMemo} from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from '@/views/login/login.tsx'
import MainPage from '@/views/mainLoyout/MainPage.tsx'
import NotesApp from '@/views/notesApp/Index.tsx'
import { useSelector} from 'react-redux'

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
                const index = result.findIndex(item => item.path === route.path)
                if(index===-1) {
                    const findRoute = allRoutes.find(r=>r.path === route.path)
                    result.push(findRoute)
                }
            }
        });
        return result
    }

    // 所有路由
    const allRoutes = [
        {
            path: '/notesApp',
            element: <NotesApp />
        }
    ]

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