import { GameContext } from "./GameContext";
import { GameWall } from "./GameWall";
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

        tail.x = x * this.gridSize
        tail.y = y * this.gridSize
        tail.width = this.gridSize
        tail.height = this.gridSize

        this.addChild(tail)

        if (tail instanceof GameFloor) {
          this.floors.push(tail)
        } else if (tail instanceof GameWall) {
          this.walls.push(tail)
        }
      }) 
    })

    this.width = maxX * this.gridSize
    this.height = maxY * this.gridSize
  }

  public addUnit(unit: GameUnit) {
    this.addChild(unit)
    this.units.push(unit)
  }

  public isFloor(x: number, y: number, width: number, height: number): boolean {
    const gridX1 = Math.floor(x / this.gridSize) 
    const gridY1 = Math.floor(y / this.gridSize)
    const gridX2 = Math.floor((x + width) / this.gridSize)
    const gridY2 = Math.floor((y + height) / this.gridSize)

    for (let gridXIndex = gridX1; gridXIndex <= gridX2; gridXIndex++) {
      const cellsRow = this.map?.[gridXIndex]

      if (!cellsRow) {
        return false
      }

      for (let gridYIndex = gridY1; gridYIndex <= gridY2; gridYIndex++) {
        const cell = cellsRow[gridYIndex]

        if (!(cell instanceof GameFloor)) {
          return false
        }
      }
    }

    return true
  }

  public draw(ctx: GameContext) {
    this.drawChild(ctx)
  }

  protected drawChild(ctx: GameContext) {
    this.floors.forEach(tail => tail.draw(ctx))
    this.units.forEach(tail => tail.draw(ctx))
    this.walls.forEach(tail => tail.draw(ctx))
  }
}