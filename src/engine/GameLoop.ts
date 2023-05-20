import { type GameCamera } from "./GameCamera"
import { GameContext } from "./GameContext"
import { GameTail } from "./GameTail"

export class GameLoop {
  public ctx: GameContext
  public onFrameHandler: (ctx: GameContext) => void = () => {}
  
  private isStarted = false
  private tails: GameTail[] = []

  constructor() {
    this.ctx = new GameContext(this)
  }

  public setCamera(camera: GameCamera): GameLoop {
    this
      .bindCtx(camera)
      .ctx
      .setCamera(camera)

    return this
  }

  public addTiles(...tails: GameTail[]): GameLoop {
    tails.forEach(tail => this.bindCtx(tail))
    this.tails.push(...tails)

    return this
  }

  bindCtx(tail: GameTail) {
    tail.setContext(this.ctx)
    tail.child.forEach(children => this.bindCtx(children))

    return this
  }

  public start() {
    if (this.isStarted) {
      throw new Error('Already started')
    }

    this.isStarted = true
  
    requestAnimationFrame(() => {
      this.onFrame()
    })

    return this
  }

  private onFrame() {
    this.ctx.onFrame()
    
    this.ctx.camera.update(this.ctx)
    this.tails.forEach((tail) => {
      tail.update(this.ctx)
    })
    this.onFrameHandler(this.ctx)

    if (this.ctx.frameDuration > 34) {
      // 34ms это примерно 30 fps
      console.warn('onFrame executing is too long')
    } 

    this.draw()

    requestAnimationFrame(() => {
      this.onFrame()
    })
  }

  private draw() {
    this.ctx.canvas.clear()

    this.tails.forEach((tail) => {
      tail.draw()
    })

    this.ctx.camera.draw()
  }
}
