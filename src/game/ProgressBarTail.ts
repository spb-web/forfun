import { GameTail } from "../engine/GameTail";

export class ProgressBarTail extends GameTail {
  private progress = 0
  private distract = 0

  init() {
    super.init()

    this.setHeight(50)
  }

  public update(): void {
    const {scene: {camera, ctx}} = this
    const progress = ctx.resources.loaded / ctx.resources.total

    if (progress === 1) {
      this.fill = undefined

      return
    }

    const maxWidth = ctx.canvas.width
    const minHeight = 50
    const width = maxWidth * progress

    if (progress !== this.progress) {
      this.distract = 1
    }

    this.distract = Math.max(0, this.distract - (ctx.frameDuration / 1000) * 3)
    this.fill = {
      style: `rgb(255, ${255 - this.distract * 255}, ${255 - this.distract * 255})`
    }

    const height = minHeight + 15 * this.distract
    
    this.progress = progress

    this
      .setWidth(width)
      .setHeight(height)
      .setX((ctx.canvas.width - width) / 2 + camera.x)
      .setY((ctx.canvas.height - height) / 2 + camera.y)
  }
}
