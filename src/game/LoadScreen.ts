import { GameTail } from "../engine/GameTail";

export class LoadScreen extends GameTail {
  private progress = 0
  private distract = 0

  init() {
    this.setHeight(50)
  }

  public update(): void {
    const progress = this.ctx.resources.loaded / this.ctx.resources.total

    if (progress === 1) {
      this.fill = undefined

      return
    }

    const maxWidth = this.ctx.canvas.width
    const minHeight = 50
    const width = maxWidth * progress

    if (progress !== this.progress) {
      this.distract = 1
    }

    this.distract = Math.max(0, this.distract - (this.ctx.frameDuration / 1000) * 3)
    this.fill = {
      style: `rgb(255, ${255 - this.distract * 255}, ${255 - this.distract * 255})`
    }

    const height = minHeight + 15 * this.distract
    
    this.progress = progress

    this
      .setWidth(width)
      .setHeight(height)
      .setX((this.ctx.canvas.width - width) / 2 + this.ctx.camera.x)
      .setY((this.ctx.camera.height - height) / 2 + this.ctx.camera.y)
  }
}
