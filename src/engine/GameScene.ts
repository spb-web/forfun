import { GameCamera } from "./GameCamera"
import { type GameContext } from "./GameContext"
import { GameTail } from "./GameTail"
import { GameCollider } from "./gameObject/GameCollider"
import { GamePlayer } from "./gameObject/GamePlayer"

export class GameScene {
  public readonly id: string
  public ctx!: GameContext
  public camera!: GameCamera
  public readonly colliders: GameCollider[] = []
  public onFrameHandler: (ctx: GameContext) => void = () => {}
  player?: GamePlayer

  private tails: GameTail[] = []

  constructor(id: string) {
    this.id = id
  }

  public setContext(ctx: GameContext) {
    this.ctx = ctx
    this.tails.forEach(tail => this.bindScene(tail))
    this.bindScene(this.camera)

    console.log(this.tails)
  }

  public setCamera(camera: GameCamera): void {
    this.bindScene(camera)
    this.camera = camera
  }

  public addTiles(...tails: GameTail[]): void {
    tails.forEach(tail => this.bindScene(tail))
    this.tails.push(...tails)
  }

  public setPayer(player: GamePlayer): void {
    this.player = player
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

  private bindScene(tail: GameTail): void {
    if (this.ctx) {
      tail.setScene(this)
      tail.child.forEach(children => this.bindScene(children))
    }
  }
}
