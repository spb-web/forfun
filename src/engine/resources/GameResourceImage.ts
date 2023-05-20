import { GameResource } from "./GameResource"

export class GameResourceImage extends GameResource<HTMLImageElement> {
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
