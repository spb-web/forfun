import { GameTail } from "../../../engine/GameTail";
import { assertReturn } from "../../../engine/helpers/assertReturn";

export class CityParallaxBackground extends GameTail {
  parallaxLayers: GameTail[] = []
  offsets: number[] = []
  isFixedPosition = false

  public init(): void {
    for (let index = 1; index <= 6; index++) {
      this.scene.ctx.resources.add(`demo-city-parallax-${index}`, `./assets/demo/cityParallax/${index}.png`)

      const layer = GameTail.create()

      layer.image = assertReturn(this.scene.ctx.resources.images.get(`demo-city-parallax-${index}`))
      layer.image.repeatPattern = 'repeat-x'

      this.parallaxLayers.push(layer)
      this.offsets.push(0)
      this.addChild(layer)
    }
  }

  public update(): void {
    this.parallaxLayers.forEach((layer, index) => {
      this.offsets[index] += (this.scene.ctx.frameDuration / 1000) * (index + 1) * 20
      // @ts-ignore

      if (this.offsets[index] >= layer.image.width) {
        console.log()
        this.offsets[index] = 0
      }
      // @ts-ignore
      layer.image.transform.e = this.offsets[index]
  
      layer
        .setWidth(this.scene.ctx.canvas.width)
        .setHeight(this.scene.ctx.canvas.height)

      // @ts-ignore
      layer.image.scale = [this.scene.ctx.canvas.width / layer.image.width, this.scene.ctx.canvas.width / layer.image.width]
    })
  }
}
