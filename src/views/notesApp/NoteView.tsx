import { NoteItem } from '@/utils/notes';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, notification, Space } from 'antd';
import { useMemo } from 'react';
export default function NoteView ({activeNote, note, onNoteDelete}: {activeNote: NoteItem, note: NoteItem, onNoteDelete: Function}) {
    const onDelete = (event: any, id: number) =>{
        event.stopPropagation();  
        const key = `open${Date.now()}`;
        const btn = (
        <Space>
            <Button type="link" size="small" onClick={() => notification.destroy()}>
            取消
            </Button>
            <Button type="primary" size="small" onClick={() => onConfirm(id)}>
            确认
            </Button>
        </Space>
        );
        notification.open({
            message: '提示',
            description:
                '确认删除吗？',
            btn,
            key,
            placement: 'top',
            onClose: notification.destroy,
        });
    }

    const onConfirm = (id: number)=>{
        notification.destroy()
        onNoteDelete(id)
    }

    const boxClass = useMemo(()=>{
        const flag = activeNote.id === note.id
        return `notes__list-item ${flag?'notes__list-item-selected':''}`
    }, [activeNote])

    return (
        <>
           <div className={boxClass} data-note-id={note.id} >
                <div className="notes__small-title text-overflow">{note.title}</div>
                <div className="notes__small-body text-overflow">
                    {note.body || ''}
                </div>
                <div className="notes__small-updated">
                    {note.updated}
                </div>
                <DeleteOutlined className='delete__icon' onClick={(event)=>onDelete(event, note.id!)}/>
            </div>
        </>
    )
}