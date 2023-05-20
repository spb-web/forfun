import { type GameCamera } from "./GameCamera";
import { GameCanvas2d } from "./GameCanvas2d";
import { GameKeyboard } from "./GameKeyboard";
import { type GameLoop } from "./GameLoop";
import { GameCollider } from "./gameObject/GameCollider";
import { GameResources } from "./resources/GameResources";

export class GameContext {
  public readonly loop: GameLoop
  public readonly keyboard = new GameKeyboard()
  public readonly canvas = new GameCanvas2d()
  public readonly resources = new GameResources()
  public gameCamera?: GameCamera

  public readonly colliders: GameCollider[] = []

  private readonly frame = {
    time: Date.now(),
    duration: 0,
  }

  public get camera(): GameCamera {
    if (!this.gameCamera) {
      throw new Error()
    }

    return this.gameCamera
  }

  public get time(): number {
    return this.frame.time
  }

  public get frameDuration(): number {
    return this.frame.duration
  }

  constructor(loop: GameLoop) {
    this.loop = loop
  }

  public onFrame(): void {
    const time = Date.now()

    this.frame.duration = time - this.frame.time
    this.frame.time = time
  }

  public setCamera(camera: GameCamera) {
    this.gameCamera = camera
  }
}