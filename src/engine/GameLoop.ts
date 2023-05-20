import { GameContext } from "./GameContext"
import { type GameScene } from "./GameScene"

export class GameLoop {
  private readonly scenes: Map<string, GameScene> = new Map()
  private activeSceneId: string = 'default'
  public ctx: GameContext
  public onFrameHandler: (ctx: GameContext) => void = () => {}
  
  private isStarted = false

  constructor() {
    this.ctx = new GameContext(this)
  }

  public get activeScene() {
    return this.scenes.get(this.activeSceneId)
  }

  public addScenes(...scenes: GameScene[]): void {
    scenes.forEach((scene) => {
      scene.setContext(this.ctx)
      this.scenes.set(scene.id, scene)
    })
  }

  public setActiveScenes(id: string) {
    this.activeSceneId = id
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
    const {activeScene} = this

    this.ctx.onFrame()

    if (activeScene) {
      this.ctx.canvas.clear()
      activeScene.onFrame()
    }
    
    this.onFrameHandler(this.ctx)

    if (this.ctx.frameDuration > 34) {
      // 34ms это примерно 30 fps
      console.warn('onFrame executing is too long')
    } 

    requestAnimationFrame(() => {
      this.onFrame()
    })
  }
}
