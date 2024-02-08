import { DownloadOutlined } from "@ant-design/icons";
import { Button, message, Radio, Space } from "antd";
import { useState } from "react";
import NotesAPI, { NoteItem } from "@/utils/notes";

export default function ImportBox({notes, _refreshNotes}: {notes: NoteItem[], _refreshNotes: Function}) {
    
    const onExport = () =>{
        if(!notes.length){
            return
        }
        const stringData = JSON.stringify(notes) 
        const blob = new Blob([stringData], {
            type: "text/plain;charset=utf-8"
        })
        const objectURL = URL.createObjectURL(blob)
        const aTag = document.createElement('a')
        aTag.href = objectURL
        aTag.download = "文本文件.txt"
        aTag.click()
        URL.revokeObjectURL(objectURL)
    }

    const onImport = ()=>{
        const input = document.getElementById('input')
        input!.click()
    }

    const changeImport = ()=>{
        const input = document.querySelector('input[type=file]') as HTMLInputElement
        const reader = new FileReader()
        reader.readAsText((input as HTMLInputElement).files![0],'utf8') // input.files[0]为第一个文件
        reader.onload = ()=>{
            const res = JSON.parse(reader.result as string || '') 
            if(Array.isArray(res)) {
                const flag = res.every((note: NoteItem)=>{
                    return note && note.title && note.body
                })
                if(flag) {
                    message.success('导入成功');
                    if(!importType){ // 覆盖
                        localStorage.removeItem("notesapp-notes")
                    } 
                    res.forEach((note: NoteItem)=> {
                        NotesAPI.saveNote(note)
                    })
                    _refreshNotes()
                } else {
                    message.error('导入内容有误');
                }
            } else {
                message.error('导入内容有误');
            }
        }
        input.value = ''
    }

    const [importType, setImportType] = useState(true)
    const onChange = (e: any)=>{
        setImportType(e.target.value)
    }
    return (
        <>
            导入方式：
            <Radio.Group onChange={onChange} value={importType}>
                <Radio value={true}>新增</Radio>
                <Radio value={false}>覆盖</Radio>
            </Radio.Group>
            <Space size={10}>
                <Button type="primary" icon={<DownloadOutlined />}  onClick={onExport}> 导出 </Button>
                <Button type="primary" icon={<DownloadOutlined />}  onClick={onImport}> 导入 </Button>
                <input id="input" type="file" onChange={changeImport} style={{display: 'none'}}></input>
            </Space>
        </>
    )
}