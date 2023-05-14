import { GameTail } from "../GameTail";

export class GameFloor extends GameTail {
  image = document.createElement('img')

  constructor() {
    super()

    this.image.src = './floor.jpg'
  }
}