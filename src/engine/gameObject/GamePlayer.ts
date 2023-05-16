import { GameContext } from "../GameContext";
import { Vec2 } from "../vector/Vec2";
import { GameUnit } from "./GameUnit";

enum PlayerState {
  idle,
  run,
}

export class GamePlayer extends GameUnit {
  image = document.createElement('img')
  playerState: PlayerState = PlayerState.idle

  constructor() {
    super()
    this.image.src = './sprite0.png'

    this
      .setWidth(50)
      .setHeight(50)
  }

  public update(ctx: GameContext): void {
    // скорость 400px в секунду при любом fps
    const speedPerSecond = 400

    this.velocity = Vec2
      .fromReadonlyVec2(ctx.keyboard.vector)
      .normalize(speedPerSecond)

    this.fill = {style: `hsl(300, 100%, 31%)`}

    // console.log(this.x, this.y, this.width, this.height)

    this.updatePosition()
    console.log(this.center.x)
  }
}
