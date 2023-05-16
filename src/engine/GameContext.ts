import { GameCamera } from "./GameCamera";
import { GameCanvas2d } from "./GameCanvas2d";
import { GameKeyboard } from "./GameKeyboard";
import { GameCollider } from "./gameObject/GameCollider";

export class GameContext {
  public readonly keyboard = new GameKeyboard()
  public readonly canvas = new GameCanvas2d()
  public readonly camera = new GameCamera()

  public readonly colliders: GameCollider[] = []

  private readonly frame = {
    time: Date.now(),
    duration: 0,
  }

  public get time() {
    return this.frame.time
  }

  public get frameDuration() {
    return this.frame.duration
  }

  public onFrame() {
    const time = Date.now()

    this.frame.duration = time - this.frame.time
    this.frame.time = time
  }
}