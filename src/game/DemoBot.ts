import type { GameContext } from "../engine/GameContext";
import { GameUnit } from "../engine/gameObject/GameUnit";

function assert<T>(v: T): asserts v is NonNullable<T> {
  if (!v) {
    throw new Error('value is nil')
  }
}

export class DemoBot extends GameUnit {
  vx = Math.random() * 50 - 25
  vy = Math.random() * 50 - 25

  fill = undefined

  image = document.createElement('img')

  constructor() {
    super()
    this.image.src = './sprite0.png'
  }
    
  update(ctx: GameContext): void {
    const {parent} = this

    // смена спрайта каждую секунду реального времени, не зависит от тормазов отрисовки (fps)
    this.image.src = `./sprite${Math.ceil(ctx.time / 1000) % 3}.png`

    assert(parent)
  
    this.width = 50;
    this.height = 50;

    const isMoved = this.moveTo(this.x + this.vx, this.y + this.vy)

    if (!isMoved) {
      this.vx = Math.random() * 50 - 25
      this.vy = Math.random() * 50 - 25
    }
  }
}