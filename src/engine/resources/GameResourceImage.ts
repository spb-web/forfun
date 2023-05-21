import { Box } from "../Box"
import { RepeatPattern } from "../GameCanvas2d"
import { GameResource } from "./GameResource"

export class GameResourceImage extends GameResource<HTMLImageElement> {
  repeatPattern: RepeatPattern = 'no-repeat'
  spriteRegion = Box.create()
  scale = [1, 1]
  transform: DOMMatrix2DInit = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
  }
  
  get width() {
    return this.data?.width ?? 0
  }

  get height() {
    return this.data?.height ?? 0
  }

  loadResource() {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = document.createElement('img')
      const handleLoaded = () => {
        image.removeEventListener('load', handleLoaded)
        resolve(image)
      }
      const handleError = (error: ErrorEvent) => {
        image.removeEventListener('error', handleError)
        reject(error)
      }
      image.addEventListener('load', handleLoaded)
      image.addEventListener('error', handleError)
      image.src = this.resource
    })
  }
}
