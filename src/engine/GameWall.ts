import { GameTail } from "./GameTail"

export class GameWall extends GameTail {
  image = document.createElement('img')

  constructor() {
    super()

    this.image.src = './wall.jpg'
  }
}