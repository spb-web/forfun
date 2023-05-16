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
  y = 80
  image = document.createElement('img')
  playerState: PlayerState = PlayerState.idle

  constructor() {
    super()
    this.image.src = './sprite0.png'
  }

  public update(ctx: GameContext): void {
    // скорость 400px в секунду при любом fps
    const speedPerSecond = 400
    this.velocity = ctx.keyboard.vector.normalize(speedPerSecond)

    this.fill = {style: `hsl(300, 100%, 31%)`}



    this.updatePosition()
  }
}
