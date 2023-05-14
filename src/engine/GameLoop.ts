import { GameContext } from "./GameContext"
import { GameTail } from "./GameTail"

export class GameLoop {
  public ctx = new GameContext()
  public onFrameHandler: (ctx: GameContext) => void = () => {}
  
  private isStarted = false
  private tails: GameTail[] = []

  public addTiles(...tails: GameTail[]) {
    return this.tails.push(...tails)
  }

  public start() {
    if (this.isStarted) {
      throw new Error('Already started')
    }

    this.isStarted = true
  
    requestAnimationFrame(() => {
      this.onFrame()
    })
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
      tail.draw(this.ctx)
    })
  }
}
