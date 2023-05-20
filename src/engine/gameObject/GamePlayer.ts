import { Vec2 } from "../vector/Vec2";
import { GameUnit } from "./GameUnit";

enum PlayerState {
  idle,
  run,
}

export class GamePlayer extends GameUnit {
  playerState: PlayerState = PlayerState.idle

  constructor() {
    super()

    this
      .setWidth(50)
      .setHeight(50)
  }

  public update(): void {
    // скорость 400px в секунду при любом fps
    const speedPerSecond = 400

    this.velocity = Vec2
      .fromReadonlyVec2(this.scene.ctx.keyboard.vector)
      .normalize(speedPerSecond)

    this.updatePosition()
  }
}
