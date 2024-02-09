
import React from 'react'

export interface XyDistance {
    x?: number
    y?: number
}
export interface ComponentData extends XyDistance {
    name: string
    component?: string
    options?: any[]
    form?: {
        [key: string]: string|number|boolean
    }
    
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