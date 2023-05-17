import { GameWall } from "../engine/gameObject/GameWall";

export class Wall extends GameWall {
  image = document.createElement('img')

  constructor() {
    super()

    this.image.src = './wall.jpg'
  }
}