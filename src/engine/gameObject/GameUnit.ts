import { GameTail } from "../GameTail";

export class GameUnit extends GameTail {
  moveTo(x: number, y: number) {
    // @ts-ignore
    if (this.parent.isFloor(x, y)) {
      this.x = x
      this.y = y

      return true
    }

    return false
  }
}