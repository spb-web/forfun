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
  get vector() {
    const vector = [0, 0]

    if (this.isActive('KeyW') || this.isActive('ArrowUp')) {
      vector[1] -= 1
    }

    if (this.isActive('KeyS') || this.isActive('ArrowDown')) {
      vector[1] += 1
    }

    if (this.isActive('KeyA') || this.isActive('ArrowLeft')) {
      vector[0] -= 1
    }

    if (this.isActive('KeyD') || this.isActive('ArrowRight')) {
      vector[0] += 1
    }

    const vectorLength = Math.sqrt((vector[0]**2) + (vector[1]**2))

    if (vectorLength > 0) {  
      vector[0] = vector[0] / vectorLength
      vector[1] = vector[1] / vectorLength
    }

    return vector
  }

  private readonly handleKeydown = (event: KeyboardEvent) => {
    this.active[event.code] = true
  }

  private readonly handleKeyup = (event: KeyboardEvent) => {
    this.active[event.code] = false
  }
}
