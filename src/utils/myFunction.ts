export function throttle(callback: (...args: any[]) => any, time: number | 'nextFrame' = 'nextFrame') {
    let flag = false
    return function (this: any, ...args: any[]) {
        if (flag) return
        flag = true
        if (time === 'nextFrame') {
            requestAnimationFrame(() => {
                flag = false
            })
        } else {
            setTimeout(() => {
                flag = false
            }, time)
        }
        return callback.apply(this, args)
    }
}