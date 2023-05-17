import type { GameContext } from "./GameContext";
import { Box } from "./Box";

export class GameTail extends Box {
  fill: {style: any} | undefined = undefined
  image?: CanvasImageSource | undefined = undefined
  isFixedPosition = false
  ctx!: GameContext
  
  parent: GameTail | null = null
  
  public child: GameTail[] = []

  public setContext(ctx: GameContext) {
    this.ctx = ctx
  }
  
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

  public draw(ctx: GameContext, parentX: number = 0, parentY: number = 0) {
    if (!ctx.camera.isVisible(this)) {
      return
    }

    let x = this.x + parentX
    let y = this.y + parentY

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

    this.drawChild(ctx, this.x, this.y)
  }

  protected drawChild(ctx: GameContext, x: number, y: number) {
    this.child.forEach(tail => {
      tail.draw(ctx, x, y)
    })
  }
}