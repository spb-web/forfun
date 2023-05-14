import { GameContext } from "../engine/GameContext";
import { GameTail } from "../engine/GameTail";
import { GameTween } from "../engine/GameTween";

export class BgTail extends GameTail {
  x = 0
  y = 0
  width = 10
  height = 10
  gameTween = new GameTween()
  isFixedPosition = true

  update(ctx: GameContext): void {
    super.update(ctx)

    const {width, height} = ctx.canvas.getScreenSize()
    this.width = width
    this.height = height
  
    this.fill = {style: `hsl(${this.gameTween.calc(ctx.time)}, 100%, 31%)`}
  }
}