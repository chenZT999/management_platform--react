import './formPage.scss'
import MyButton from '@/components/MyButton'
import { useRef } from 'react'

export default function FormPage() {
    const inputRef = useRef()
    const onButton = ()=>{
        const data = inputRef.current.testRef
    }
    return (
        <div className="form-page-box">
            <MyButton type="primary" danger ref={inputRef} onClick={onButton}>按钮</MyButton>
        </div>
    )
}