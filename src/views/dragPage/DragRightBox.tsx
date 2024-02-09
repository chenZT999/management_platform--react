import MyInput from '@/components/MyInput'
import { changeCompByKey } from '@/store/dragComponent'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useMemo } from 'react'
import './dragRightBox.scss'

export default function DragRightBox() {
    const useDispatch = useAppDispatch()
    const componentList = useAppSelector(state=>state.dragComponent.componentList)
    const editIndex = useAppSelector(state=>state.dragComponent.editIndex)
    const currentComponent = useMemo(()=>{
        if(editIndex>=0) {
            return componentList[editIndex]
        } else {
            return null
        }
    }, [componentList, editIndex])

    const optionsData = useMemo(()=>{
        return currentComponent?.options || []
    }, [currentComponent])

    const formData = useMemo(()=>{
        return currentComponent?.form || {}
    }, [currentComponent])
    
    // 判断渲染的控件
    function renderComponent(compItem) {
        const props = {
            value: formData[compItem.key],
            onChange: (e) => {
                useDispatch(changeCompByKey({key: 'form', value: e.target.value, key2: compItem.key}))
            }
        }
        switch (compItem.component) {
            case 'MyInput':
                return <MyInput {...props} />
            default:
                return <div>暂无此控件</div>
        }
    }


    return (
        <div className='drag-right-box'>
            <div>数据配置</div>
            {
                optionsData.map((compItem, index)=>{
                    return (
                        <div key={index} className="flex-center option-item">
                            <div className="label-text">{compItem.name}</div>
                            ：{renderComponent(compItem)}
                        </div>
                    )
                })
            }
        </div>
    )
}