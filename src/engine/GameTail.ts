import { Box } from "./Box";
import { GameResourceImage } from "./resources/GameResourceImage";
import { GameScene } from "./GameScene";

export class GameTail extends Box {
  fill?: {style: any} | undefined = undefined
  image?: CanvasImageSource | GameResourceImage | undefined = undefined
  isFixedPosition = false
  scene!: GameScene 
  
  parent: GameTail | null = null
  
  public child: GameTail[] = []

  public setScene(scene: GameScene): void {
    this.scene = scene
    console.log(this, this.init)

    this.init()
  }

  public init(): void {}
  
  public setParent(tail: GameTail) {
    this.parent = tail
  }

  public addChild(...child: GameTail[]) {
    child.forEach(tail => tail.setParent(this))
    
    return this.child.push(...child)
  }

  public onFrame() {
    this.update()
    this.child.forEach(tail => tail.onFrame())
  }

  public update() {}

  public draw(parentX: number = 0, parentY: number = 0) {
    const {scene: {camera, ctx}} = this

    if (!camera.checkCollided(Box.from(this).setX(this.x + parentX).setY(this.y + parentY))) {
      return
    }

    let x = this.x + parentX
    let y = this.y + parentY

    if (!this.isFixedPosition) {
      x -= camera.x;
      y -= camera.y;
    }

    ctx.canvas.drawRectangle({
      x,
      y,
      width: this.width,
      height: this.height,
      fill: this.fill,
      image: this.image,
    })

    this.drawChild(this.x, this.y)
  }

  protected drawChild(x: number, y: number) {
    this.child.forEach(tail => {
      tail.draw(x, y)
    })
  }
}