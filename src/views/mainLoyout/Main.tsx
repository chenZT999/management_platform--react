import TopHeader from './TopHeader'
import LeftNav from './leftNav'
import App from '@/App.tsx'
export default function() {
    return (
        <div>
            <TopHeader />
            <div>
                <div>
                    <LeftNav></LeftNav>
                </div>
                <div>
                    <App />
                </div>
            </div>
        </div>
    )
} 