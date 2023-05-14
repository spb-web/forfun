import { GameTail } from "../GameTail";

export class GameUnit extends GameTail {
  x = 190
  y = 190
  moveTo(x: number, y: number) {
    // @ts-ignore
    if (this.parent.isFloor(x, y, this.width, this.height)) {
      this.x = x
      this.y = y

      return true
    }

    return false
  }
}