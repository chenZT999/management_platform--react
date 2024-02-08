
import React from 'react'

export interface XyDistance {
    x?: number
    y?: number
}
export interface ComponentData extends XyDistance {
    name: string
    component?: string
    
}

export const allFromComponent: ComponentData[] = [
    {
        name: '按钮',
        component: 'MyButton'
    }, {
        name: '输入框',
        component: 'MyInput'
    }

]