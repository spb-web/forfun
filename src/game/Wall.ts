import { GameWall } from "../engine/gameObject/GameWall";

export class Wall extends GameWall {
  init() {
    super.init()

    const {scene: {ctx}} = this

    ctx.resources.add('wall', './wall.jpg')
    this.image = ctx.resources.images.get('wall')
  }
}
