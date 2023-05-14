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
  image?: CanvasImageSource | undefined
}

export class GameCanvas2d {
  private canvas = document.createElement('canvas')
  private ctx2d = assertReturn(this.canvas.getContext('2d'), 'can not create 2d context')

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

  public resize(w: number, h: number) {
    this.canvas.width = w
    this.canvas.height = h
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
      this.ctx2d.drawImage(image, x, y, width, height)
    }
  }

  private fill(fill: FillData) {
    this.ctx2d.fillStyle = fill.style
  }
}
