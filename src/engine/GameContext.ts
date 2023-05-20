import { GameCanvas2d } from "./GameCanvas2d";
import { GameKeyboard } from "./GameKeyboard";
import { type GameLoop } from "./GameLoop";
import { GameResources } from "./resources/GameResources";

export class GameContext {
  public readonly loop: GameLoop
  public readonly keyboard = new GameKeyboard()
  public readonly canvas = new GameCanvas2d()
  public readonly resources = new GameResources()

  private readonly frame = {
    time: Date.now(),
    duration: 0,
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
}