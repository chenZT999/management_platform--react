
import NotesApp from '@/views/notesApp/Index.tsx'
import FormPage from '@/views/form/FormPage.tsx'
import TablePage from '@/views/form/TablePage.tsx'

// 所有路由
const allRoutes = [
    {
        path: '/notesApp',
        element: <NotesApp />
    }, {
        path: '/formPage',
        element: <FormPage />
    }, {
        path: '/tablePage',
        element: <TablePage />
    }
]
export default allRoutes