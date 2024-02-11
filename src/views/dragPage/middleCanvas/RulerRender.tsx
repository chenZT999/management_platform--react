import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useMemo, useRef } from "react";
import Ruler from "./ruler"

interface RulerProps {
    direction?: 'h'|'v'
    offset: number
    scale: number
    backgroundColor?: string
    tickColor?: string
    labelColor?: string
    id: string
}

export default function RulerRender({
    direction = 'h', 
    offset = 0,
    scale = 1,
    backgroundColor = 'rgba(12,24,59,0.5)',
    tickColor = 'rgb(255,255,255)',
    labelColor = 'rgb(255,255,255)',
    id
}: RulerProps) {
    const canvasSetting = useAppSelector(state => state.dragComponent.canvasSetting)

    const ruler = useRef(new Ruler())
    const rulerOption = useMemo(()=>{
        const form = canvasSetting.form
        const width = direction==='h' ? form.width : 25
        const height = direction==='h' ? 25 : form.height
        return {
            width,
            height,
            offset,
            direction,
            backgroundColor,
            tickColor,
            labelColor,
            scale
        }
    }, [canvasSetting])

    useEffect(()=>{
        ruler.current.setOption(rulerOption)
        const dom = document.getElementById(id)
        ruler.current.init(dom, rulerOption)
    }, [rulerOption])

    return (
        <div id={id}></div>
    )
}