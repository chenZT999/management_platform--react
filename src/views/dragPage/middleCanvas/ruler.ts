interface IOption {
    /**
     * 标尺宽度
     */
    width: number
    /**
     * 标尺高度
     */
    height: number
    /**
     * 零刻度偏移
     */
    offset: number
    /**
     * 标尺方向
     */
    direction: 'h' | 'v'
    /**
     * 背景颜色
     */
    backgroundColor: string
    /**
     * 刻度线颜色
     */
    tickColor: string
    /**
     * 刻度数值颜色
     */
    labelColor: string
    /**
     * 标尺缩放值
     */
    scale: number
}

type Option = Partial<IOption>

class Ruler {
  canvas = document.createElement('canvas')
  ctx!: CanvasRenderingContext2D

  option!: IOption

  constructor() {
    this.option = {
        width: 300,
        height: 25,
        offset: 0,
        direction: 'h',
        backgroundColor: 'rgba(12,24,59,0.5)',
      tickColor: 'rgb(38,73,130)',
      labelColor: 'rgb(255,255,255)',
      scale: 1
    }
    this.canvas.style.display = 'block'
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  /**
   * 初始化
   * @param container 容器元素
   * @param option 标尺参数
   */
  init(container: HTMLElement, option: Option = {}) {
    container.appendChild(this.canvas)
    this.setOption(option)
  }

  setOption(option: Option) {
    Object.assign(this.option, option)
    const { width, height } = this.option
    this.canvas.width = width
    this.canvas.height = height
    this.render()
}

render() {
    const { width, height, backgroundColor, direction } = this.option
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.fillStyle = backgroundColor
    this.ctx.fillRect(0, 0, width, height)
    if (direction === 'h') {
        this.draw(width, height)
      } else {
         // 绘制垂直方向的标尺：先旋转、平移变换，即可将水平标尺变为垂直标尺
      this.ctx.rotate(Math.PI / 180 * 90)
      this.ctx.translate(0, -width)
      this.draw(height, width)
    }
  }

   /**
   * 绘制一个水平方向的标尺
   * @param width 
   * @param height 
   */
   draw(width: number, height: number) {
    const { offset, tickColor, labelColor, scale } = this.option
    if (scale === 0) return
    let step = 10 / scale
    if (step >= 10) {
        step = 10
    } else if (step >= 5) {
      step = 5
    } else if (step >= 2) {
        step = 2
    } else {
      step = 1
    }

    const stop = (width - offset) / scale + offset
    // 绘制标尺刻度线
    let current = offset
    this.ctx.beginPath()
    while (current <= stop) {
      const tickValue = Math.round(current - offset)
      const translate = round(offset + tickValue * scale)
      this.ctx.moveTo(translate, height)
      if (tickValue % 200 === 0) {
        this.ctx.lineTo(translate, height - 25)
      } else if (tickValue % 100 === 0) {
        this.ctx.lineTo(translate, height - 7)
    } else if (tickValue % step === 0) {
        this.ctx.lineTo(translate, height - 3)
      }
      current += step
    }
    this.ctx.strokeStyle = tickColor
    this.ctx.stroke()
    // 绘制标尺刻度数值
    current = offset
    this.ctx.beginPath()
    this.ctx.fillStyle = labelColor
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'top'
    this.ctx.font = '12px Microsoft Yahei'
    while (current <= stop) {
        const tickValue = Math.round(current - offset)
        const translate = round(offset + tickValue * scale)
        if (tickValue % 100 === 0) {
            this.ctx.fillText(String(tickValue), translate + 2, height - 22)
      }
      current += step
    }
  }
}

function round(number: number) {
    return Math.round(number) + 0.5
  }
  
  export default Ruler
  