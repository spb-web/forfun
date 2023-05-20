import { GameResourceImage } from "./GameResourceImage";

export class GameResources {
  public readonly images: Map<string, GameResourceImage> = new Map()
  public loaded = 0
  public total = 0
  
  public add(id: string, resource: string) {
    if (this.images.has(id)) {
      return
    } else {
      this.images.set(id, new GameResourceImage(id, resource))
      this.total += 1
    }
  }

  public load() {
    const promises: Promise<unknown>[] = []
    
    this.images.forEach((resource) => {
      promises.push(
        resource.load().then(() => {
          this.loaded += 1
        })
      )
    })

    return Promise.all(promises)
  }
}
