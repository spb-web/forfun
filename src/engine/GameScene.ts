import { GameCamera } from "./GameCamera"
import { type GameContext } from "./GameContext"
import { GameTail } from "./GameTail"
import { GameCollider } from "./gameObject/GameCollider"

export class GameScene {
  public readonly id: string
  public ctx!: GameContext
  public camera!: GameCamera
  public readonly colliders: GameCollider[] = []
  public onFrameHandler: (ctx: GameContext) => void = () => {}

  private tails: GameTail[] = []

  constructor(id: string) {
    this.id = id
  }

  public setContext(ctx: GameContext) {
    this.ctx = ctx
    this.tails.forEach(tail => this.bindCtx(tail))
    this.bindCtx(this.camera)

    console.log(this.tails)
  }

  public setCamera(camera: GameCamera): void {
    this.bindCtx(camera)
    this.camera = camera
  }

  public addTiles(...tails: GameTail[]): void {
    tails.forEach(tail => this.bindCtx(tail))
    this.tails.push(...tails)
  }

  public onFrame() {    
    this.camera.onFrame()
    this.tails.forEach((tail) => tail.onFrame())
    this.onFrameHandler(this.ctx)

    this.draw()
  }

  public draw() {
    this.tails.forEach((tail) => tail.draw())
    this.camera.draw()
  }

  private bindCtx(tail: GameTail): void {
    if (this.ctx) {
      tail.setScene(this)
      tail.child.forEach(children => this.bindCtx(children))
    }
  }
}
