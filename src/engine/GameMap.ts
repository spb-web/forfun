import { GameWall } from "./gameObject/GameWall";
import { GameTail } from "./GameTail";
import { GameUnit } from "./gameObject/GameUnit";
import { GameFloor } from "./gameObject/GameFloor";

export class GameMap extends GameTail {
  protected map: (GameWall|GameFloor)[][] = []
  protected walls: GameWall[] = []
  protected floors: GameFloor[] = []
  protected units: GameTail[] = []
  private gridSize = 32

  constructor(map: (GameWall|GameFloor)[][] = []) {
    super()

    this.map = map

    let maxX = 0
    let maxY = map.length
    
    map.forEach((row, x) => {
      maxX = Math.max(maxX, row.length)

      row.forEach((tail, y) => {

        tail
          .setX(x * this.gridSize)
          .setY(y * this.gridSize)
          .setWidth(this.gridSize)
          .setHeight(this.gridSize)

        this.addChild(tail)

        if (tail instanceof GameFloor) {
          this.floors.push(tail)
        } else if (tail instanceof GameWall) {
          this.walls.push(tail)
        }
      }) 
    })

    this
      .setWidth(maxX * this.gridSize)
      .setHeight(maxY * this.gridSize)
  }

  public addUnits(...units: GameUnit[]) {
    this.addChild(...units)
    this.units.push(...units)

    return this
  }

  public addWall(wall: GameWall) {
    this.addChild(wall)
    this.walls.push(wall)
  }

  public draw() {
    this.drawChild()
  }

  protected drawChild() {
    this.floors.forEach(tail => tail.draw())
    this.units.forEach(tail => tail.draw())
    this.walls.forEach(tail => tail.draw())
  }
}