export abstract class GameResource<D> {
  protected resource: string
  public data: D | null = null
  public id: string
  public isLoaded = false

  constructor(id: string, resource: string) {
    this.id = id
    this.resource = resource
  }

  public async load() {
    if (this.isLoaded) {
      return
    }

    this.data = await this.loadResource()
    this.isLoaded = true
  }

  protected loadResource(): Promise<D | null> {return Promise.resolve(this.data)}
}
