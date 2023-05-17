import { GameTail } from "../engine/GameTail";
import { GameWall } from "../engine/gameObject/GameWall";

export class Car extends GameWall {
  constructor() {
    super()

    const car = new GameTail()

    car.image = document.createElement('img')
    car.image.src = './car.png'


    this
      .setWidth(95)
      .setHeight(230)
      .addChild(
        car
          .setWidth(135)
          .setHeight(230)
          .setX(-20)
      )
  }
}