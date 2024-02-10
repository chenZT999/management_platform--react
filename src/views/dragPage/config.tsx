
import React from 'react'

export interface XyDistance {
    x?: number
    y?: number
}

export interface SettingData {
    options?: any[]
    form?: {
        [key: string]: string|number|boolean
    }
}

export interface ComponentData extends SettingData  {
    name: string
    component?: string
    
    
}

export const allFromComponent: ComponentData[] = [
    {
        name: '按钮',
        component: 'MyButton',
        options: [
            {
                name: '标签',
                component: 'MyInput',
                key: 'title'
            }
        ],
        form: {
            title: '按钮'
        }
    }, {
        name: '输入框',
        component: 'MyInput',
        options: [
            {
                name: '标签',
                component: 'MyInput',
                key: 'title'
            }
        ],
        form: {
            title: '输入框'
        }
    }

]

function Mixin(XyDistance: any, Setting: any) {
    throw new Error('Function not implemented.')
}
