import type { GameContext } from "./GameContext";

export class GameTail {
  x: number = 0
  y: number = 0
  width: number = 0
  height: number = 0
  fill: {style: any} | undefined = undefined
  image?: CanvasImageSource | undefined = undefined
  isFixedPosition = false

  parent: GameTail | null = null

  protected child: GameTail[] = []

  public setParent(tail: GameTail) {
    this.parent = tail
  }

  public addChild(...child: GameTail[]) {
    child.forEach(tail => tail.setParent(this))
    return this.child.push(...child)
  }

  public update(ctx: GameContext) {
    this.child.forEach(tail => tail.update(ctx))
  }

  public draw(ctx: GameContext) {
    if (!ctx.camera.isVisible(this)) {
      return
    }

    let x = this.x
    let y = this.y

    if (!this.isFixedPosition) {
      x -= ctx.camera.x;
      y -= ctx.camera.y;
    }

    ctx.canvas.drawRectangle({
      x,
      y,
      width: this.width,
      height: this.height,
      fill: this.fill,
      image: this.image,
    })

    this.drawChild(ctx)
  }

  protected drawChild(ctx: GameContext) {
    this.child.forEach(tail => {
      tail.draw(ctx)
    })
  }
}