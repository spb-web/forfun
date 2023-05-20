import type { GameContext } from "./GameContext";
import { Box } from "./Box";
import { GameResourceImage } from "./resources/GameResourceImage";

export class GameTail extends Box {
  fill?: {style: any} | undefined = undefined
  image?: CanvasImageSource | GameResourceImage | undefined = undefined
  isFixedPosition = false
  ctx!: GameContext
  
  parent: GameTail | null = null
  
  public child: GameTail[] = []

  public init(): void {}

  public setContext(ctx: GameContext): void {
    this.ctx = ctx
    this.init()
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

  public draw(parentX: number = 0, parentY: number = 0) {
    const {ctx} = this

    if (!ctx.camera.checkCollided(Box.from(this).setX(this.x + parentX).setY(this.y + parentY))) {
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

    this.drawChild(this.x, this.y)
  }

  protected drawChild(x: number, y: number) {
    this.child.forEach(tail => {
      tail.draw(x, y)
    })
  }
}