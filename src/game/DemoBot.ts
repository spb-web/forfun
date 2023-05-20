import type { GameContext } from "../engine/GameContext";
import { GameUnit } from "../engine/gameObject/GameUnit";
import { Vec2 } from "../engine/vector/Vec2";

function assert<T>(v: T): asserts v is NonNullable<T> {
  if (!v) {
    throw new Error('value is nil')
  }
}

export class DemoBot extends GameUnit {
  public velocity: Vec2 = Vec2.create(Math.random() * 1600 - 800, Math.random() * 1600 - 800)

  fill = undefined


  constructor() {
    super()

    this
      .setWidth(50)
      .setHeight(50)
  }

  init() {
    this.ctx.resources.add('bot-character-0', './sprite0.png')
    this.ctx.resources.add('bot-character-1', './sprite1.png')
    this.ctx.resources.add('bot-character-2', './sprite2.png')

    this.image = this.ctx.resources.images.get('player-character')
  }
    
  update(ctx: GameContext): void {
    const {parent} = this

    // смена спрайта каждую секунду реального времени, не зависит от тормазов отрисовки (fps)
    this.image = this.ctx.resources.images.get(`bot-character-${Math.ceil(ctx.time / 1000) % 3}`)

    assert(parent)

    this.updatePosition()

    if (this.collided) {
      this.velocity = Vec2.create(Math.random() * 1600 - 800, Math.random() * 1600 - 800)
    }
  }
}