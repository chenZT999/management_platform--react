
import NotesApp from '@/views/notesApp/Index.tsx'
import FormPage from '@/views/form/FormPage.tsx'
import DragPage from '@/views/dragPage/DragPage.tsx'
import EventTest from './test/EventTest'

// 所有路由
const allRoutes = [
    {
        path: '/notesApp',  // 笔记本
        element: <NotesApp />
    }, {
        path: '/formPage',  // antd组件
        element: <FormPage />
    }, {
        path: '/dragPage',  // 
        element: <DragPage />
    }, {
        path: '/eventTest',   // 测试练习
        element: <EventTest />
    }
]
export default allRoutes