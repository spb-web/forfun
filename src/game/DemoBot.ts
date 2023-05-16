import type { GameContext } from "../engine/GameContext";
import { GameUnit } from "../engine/gameObject/GameUnit";
import { Vec2 } from "../engine/vector/Vec2";

function assert<T>(v: T): asserts v is NonNullable<T> {
  if (!v) {
    throw new Error('value is nil')
  }
}

export class DemoBot extends GameUnit {
  public velocity: Vec2 = Vec2.create(Math.random() * 800 - 400, Math.random() * 800 - 400)

  fill = undefined

  image = document.createElement('img')

  constructor() {
    super()
    this.image.src = './sprite0.png'

    this
      .setWidth(50)
      .setHeight(50)
  }
    
  update(ctx: GameContext): void {
    const {parent} = this

    // смена спрайта каждую секунду реального времени, не зависит от тормазов отрисовки (fps)
    this.image.src = `./sprite${Math.ceil(ctx.time / 1000) % 3}.png`

    assert(parent)

    this.updatePosition()

    if (this.collided) {
      this.velocity = Vec2.create(Math.random() * 800 - 400, Math.random() * 800 - 400)
    }
  }
}