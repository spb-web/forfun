import { GameContext } from "./GameContext";
import { GameTail } from "./GameTail";

export class GameCamera extends GameTail {
  fill = { style: 'transparent' }

  update(ctx: GameContext): void {
    const {width, height} = ctx.canvas.getScreenSize()
    this.width = width
    this.height = height
  }

  isVisible(tail: GameTail): boolean {
    return !(tail.x + tail.width < this.x || tail.x > this.x + this.width
    || tail.y + tail.height < this.y|| tail.y > this.y + this.height)
  }
  
  public draw(ctx: GameContext): void {
    ctx.canvas.drawRectangle({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      fill: this.fill,
    })
  
    this.drawChild(ctx)
  }
}
