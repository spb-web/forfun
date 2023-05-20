import { GameWall } from "../engine/gameObject/GameWall";

export class Wall extends GameWall {
  init() {
    this.ctx.resources.add('wall', './wall.jpg')
    this.image = this.ctx.resources.images.get('wall')
  }
}
