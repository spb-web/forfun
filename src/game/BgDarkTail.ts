import { GameTail } from "../engine/GameTail";
import { GameTween } from "../engine/GameTween";

export class BgDarkTail extends GameTail {
  gameTween = new GameTween()
  isFixedPosition = true

  update(): void {
    const {scene: {ctx}} = this
    const {width, height} = ctx.canvas.getScreenSize()

    this
      .setWidth(width)
      .setHeight(height)
  
    this.fill = {style: `hsl(${this.gameTween.calc(ctx.time)}, 100%, 10%)`}
  }
}
