import { ReadonlyVec2 } from "./vector/ReadonlyVec2"
import { Vec2 } from "./vector/Vec2"

export class GameKeyboard {
  private active: Record<string, boolean> = {}

  constructor() {
    window.addEventListener('keydown', this.handleKeydown)
    window.addEventListener('keyup', this.handleKeyup)
  }

  isActive(code: string): boolean {
    return this.active[code] ?? false
  }

  // единичный вектор направления движения
  get vector(): ReadonlyVec2 {
    let x = 0
    let y = 0

    if (this.isActive('KeyW') || this.isActive('ArrowUp')) {
      y -= 1
    }

    if (this.isActive('KeyS') || this.isActive('ArrowDown')) {
      y += 1
    }

    if (this.isActive('KeyA') || this.isActive('ArrowLeft')) {
      x -= 1
    }

    if (this.isActive('KeyD') || this.isActive('ArrowRight')) {
      x += 1
    }

    const vector: ReadonlyVec2 = ReadonlyVec2.fromVec2(
      Vec2
        .create(x, y)
        .normalize()
    )

    return vector
  }

  private readonly handleKeydown = (event: KeyboardEvent) => {
    this.active[event.code] = true
  }

  private readonly handleKeyup = (event: KeyboardEvent) => {
    this.active[event.code] = false
  }
}
