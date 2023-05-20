import { GameFloor } from "../engine/gameObject/GameFloor";

export class Floor extends GameFloor {
  init() {
    this.ctx.resources.add('floor', './floor.jpg')
    this.image = this.ctx.resources.images.get('floor')
  }
}