
import { Button, message, notification, Space } from 'antd';
import { useState, useEffect } from 'react'
import { NoteItem } from '@/utils/notes';

export default function EditNote({activeNote, onNoteAdd, onNoteEdit}: {activeNote: NoteItem, onNoteAdd: Function, onNoteEdit: Function}) {
    useEffect(()=>{
        setTitle(activeNote.title||'')
        setBody(activeNote.body||'')
    }, [activeNote])

    // 点击提交
    const onSubmit = ()=>{
        if(!title || !body) {
            message.warning('请填写完整内容');
            return
        }

        const key = `open${Date.now()}`;
        const btn = (
        <Space>
            <Button type="link" size="small" onClick={() => notification.destroy()}>
            取消
            </Button>
            <Button type="primary" size="small" onClick={() => onConfirm()}>
            确认
            </Button>
        </Space>
        );
        notification.open({
            message: '提示',
            description:
                '确认提交吗？',
            btn,
            key,
            placement: 'top',
            onClose: notification.destroy,
        });
        
    }

    // 确认提交
    const onConfirm = () => {
        notification.destroy()
        if(!activeNote.id) {
            onNoteAdd(title, body)
        } else {
            onNoteEdit(title, body)
        }
        setTitle('')
        setBody('')

    }

    const [title, setTitle] = useState(activeNote.title||'')
    const [body, setBody] = useState(activeNote.body||'')
    // 修改标题
    const changeTitle = (e: any)=>{
        setTitle(e.target.value)
    }
    // 修改内容
    const changeBody = (e: any)=>{
        setBody(e.target.value)
    }

    

    return (
        <div style={{margin: '20px'}}>
            <input className="notes__title" type="text" placeholder="新笔记..." value={title||''} onChange={changeTitle}/>
            <textarea className="notes__body" placeholder="编辑笔记..." value={body||''} maxLength={200} onChange={changeBody}></textarea>
            <Button type="primary" onClick={onSubmit}>提交</Button>
        </div>
    )
}