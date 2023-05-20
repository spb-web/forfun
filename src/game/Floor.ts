import { GameFloor } from "../engine/gameObject/GameFloor";

export class Floor extends GameFloor {
  init() {
    super.init()

    const {scene: {ctx}} = this
    ctx.resources.add('floor', './floor.jpg')
    this.image = ctx.resources.images.get('floor')
  }
}