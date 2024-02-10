import MyInput from '@/components/MyInput'
import MyInputNumber from '@/components/MyInputNumber'
import { changeCompByKey } from '@/store/dragComponent'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useMemo } from 'react'
import './dragRightBox.scss'

export default function DragRightBox() {
    const useDispatch = useAppDispatch()
    const componentList = useAppSelector(state=>state.dragComponent.componentList)
    const editIndex = useAppSelector(state=>state.dragComponent.editIndex)
    const canvasSetting = useAppSelector(state=>state.dragComponent.canvasSetting)
    const currentComponent = useMemo(()=>{
        if(editIndex>=0) {
            return componentList[editIndex]
        } else {
            return null
        }
    }, [componentList, editIndex])

    const optionsData = useMemo(()=>{
        if(editIndex===-1) {
            // 编辑组件画布
            return canvasSetting?.options || []
        } else {
            // 编辑组件配置
            return currentComponent?.options || []
        }
    }, [currentComponent, canvasSetting])

    const formData = useMemo(()=>{
        if(editIndex===-1) {
            return canvasSetting?.form || {}
        } else {
            return currentComponent?.form || {}
        }
    }, [currentComponent, canvasSetting])
    
    // 判断渲染的控件
    function renderComponent(compItem) {
        const onChange = (e) => {
            useDispatch(changeCompByKey({key: compItem.key, value: e.target ? e.target.value : e}))
        }
        const props = {
            value: formData[compItem.key],
            onChange,
            ...compItem.props,
        }
        switch (compItem.component) {
            case 'MyInput':
                return <MyInput {...props} />
                break;
            case 'MyInputNumber':
                props.defaultValue = formData[compItem.key]
                // props.onChange = (e)=>{
                //     console.log(e,'e')
                // }
                return <MyInputNumber {...props} />
                break;
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