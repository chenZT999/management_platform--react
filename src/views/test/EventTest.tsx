import { useEffect } from "react"

export default function EventTest(){
    useEffect(()=>{
            
        const outEle = document.getElementById('out')!
        const inEle = document.getElementById('in')!

        outEle.addEventListener('click', ()=>{
            console.log('out冒泡')
        })

        inEle.addEventListener('click', ()=>{
            console.log('in冒泡')
        })
        
        outEle.addEventListener('click', ()=>{
            console.log('out捕获')
        }, true)

        inEle.addEventListener('click', ()=>{
            console.log('in捕获')
        }, true)


    })
    return (
        <div id="out">
            <div id="in">
                冒泡捕获测试
            </div>
        </div>
    )
}