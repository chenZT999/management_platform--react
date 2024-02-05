
import { Button, } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
// {
//     children,
//     block = false,
//     classNames,
//     danger = false,
//     disabled = false,
//     ghost = false,
//     href,
//     htmlType,
//     icon,
//     loading,
//     shape,
//     size,
//     styles,
//     target,
//     type,
//     onClick,
// }forwardRef
 const MyButton = forwardRef( 
    (porps: BaseButtonProps, ref: any) => {
        const testRef = '获取值'
        useImperativeHandle(ref, ()=>{
            return {
                testRef
            }
        })
        return (
            <Button {...porps}>
                {porps.children}
            </Button>
        )
    }
 )

export default MyButton