import { GameWall } from "../engine/gameObject/GameWall";

export class Car extends GameWall {
  public readonly fill = undefined
  public readonly image = document.createElement('img')

  constructor() {
    super()
    this.image.src = './car.png'

    this
      .setWidth(135)
      .setHeight(230)
  }
}