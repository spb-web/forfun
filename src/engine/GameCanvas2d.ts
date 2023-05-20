import { Box } from "./Box"
import { GameResourceImage } from "./resources/GameResourceImage"

const assertReturn = <T>(v: T, message = 'value is nil'): NonNullable<T> => {
  if (!v) {
    throw new Error(message)
  }

  return v
}

type FillData = {
  style: string | CanvasGradient | CanvasPattern
}

type Rectangle = {
  x: number
  y: number
  width: number
  height: number
  fill: FillData | undefined
}

type RectangleData = Rectangle & {
  fill: FillData | undefined
  image?: CanvasImageSource | GameResourceImage | undefined
}

export class GameCanvas2d extends Box {
  private canvas = document.createElement('canvas')
  public ctx2d = assertReturn(
    this.canvas.getContext('2d', {alpha: false}),
    'can not create 2d context',
  )

  constructor() {
    super()

    this.ctx2d.imageSmoothingEnabled = false
  }

  public getElement() {
    return this.canvas
  }

  public getScreenSize() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    }
  }

  get width() {
    return this.canvas.width
  }

  get height() {
    return this.canvas.height
  }

  public setWidth(width: number): this {
    super.setWidth(width)

    this.canvas.width = width

    return this
  }

  public setHeight(height: number): this {
    super.setHeight(height)

    this.canvas.height = height

    return this
  }

  public clear() {
    this.drawRectangle({
      x: 0, y: 0, width: this.canvas.width, height: this.canvas.height,
      fill: {
        style: '#000'
      }
    })
  }

  public drawRectangle({x, y, width, height, fill, image}: RectangleData) {
    if (fill) {
      this.fill(fill)
      this.ctx2d.fillRect(x, y, width, height)
    }

    if (image) {
      if (image instanceof GameResourceImage) {
        if (image.data) {
          this.ctx2d.drawImage(image.data, x, y, width, height)
        }
      } else {
        this.ctx2d.drawImage(image, x, y, width, height)
      }
    }
  }

  private fill(fill: FillData) {
    this.ctx2d.fillStyle = fill.style
  }
}
