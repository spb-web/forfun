import { GameContext } from "../GameContext";
import { GameUnit } from "./GameUnit";

enum PlayerState {
  idle,
  run,
}

export class GamePlayer extends GameUnit {
  width = 50
  height = 50
  x = 100
  y = 100
  image = document.createElement('img')
  playerState: PlayerState = PlayerState.idle

  constructor() {
    super()
    this.image.src = './sprite0.png'
  }

  public update(ctx: GameContext): void {
    const vector = ctx.keyboard.vector
    // скорость 100px в секунду при любом fps
    const speedPerSecond = 400
    const speedPerFrame = speedPerSecond * ctx.frameDuration / 1000

    this.moveTo(
      this.x + vector[0] * speedPerFrame,
      this.y + vector[1] * speedPerFrame,
    )

    this.fill = {style: `hsl(300, 100%, 31%)`}
  }
}
