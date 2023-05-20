import { GameTail } from "../engine/GameTail";
import { GameWall } from "../engine/gameObject/GameWall";

export class Car extends GameWall {
  private car = new GameTail()

  constructor() {
    super()

    this
      .setWidth(95)
      .setHeight(230)
      .addChild(
        this.car
          .setWidth(135)
          .setHeight(230)
          .setX(-20)
      )
  }

  init() {
    this.ctx.resources.add('car', './car.png')
    this.car.image = this.ctx.resources.images.get('car')
  }
}