import { GameCollider } from "./GameCollider"

export class GameWall extends GameCollider {
  image = document.createElement('img')

  constructor() {
    super()

    this.image.src = './wall.jpg'
  }
}