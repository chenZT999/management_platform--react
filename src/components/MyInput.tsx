import { Input, InputProps } from "antd";

export default function MyInput(props: InputProps) {
    return (
        <Input {...props} placeholder="请输入"/>
    )
}