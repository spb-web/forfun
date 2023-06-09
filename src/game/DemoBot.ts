import { GameUnit } from "../engine/gameObject/GameUnit";
import { Vec2 } from "../engine/vector/Vec2";

function assert<T>(v: T): asserts v is NonNullable<T> {
  if (!v) {
    throw new Error('value is nil')
  }
}

export class DemoBot extends GameUnit {
  public velocity: Vec2 = Vec2.create(Math.random() * 1600 - 800, Math.random() * 1600 - 800)

  constructor() {
    super()

    this
      .setWidth(32)
      .setHeight(32)
  }

  init() {
    super.init()

    const {ctx} = this.scene

    ctx.resources.add('bot-character-0', './sprite0.png')
    ctx.resources.add('bot-character-1', './sprite1.png')
    ctx.resources.add('bot-character-2', './sprite2.png')

    this.image = ctx.resources.images.get('player-character')
  }
    
  update(): void {
    const {parent, scene: {ctx}} = this

    // смена спрайта каждую секунду реального времени, не зависит от тормазов отрисовки (fps)
    this.image = ctx.resources.images.get(`bot-character-${Math.ceil(ctx.time / 1000) % 3}`)

    assert(parent)

    this.updatePosition()

    if (this.collided) {
      this.velocity = Vec2.create(Math.random() * 1600 - 800, Math.random() * 1600 - 800)
    }
  }
}