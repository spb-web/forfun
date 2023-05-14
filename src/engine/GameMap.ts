import { GameContext } from "./GameContext";
import { GameWall } from "./GameWall";
import { GameTail } from "./GameTail";
import { GameUnit } from "./gameObject/GameUnit";

export class GameMap extends GameTail {
  protected map: (GameWall|undefined)[][] = []
  protected walls: GameWall[] = []
  protected units: GameTail[] = []
  private gridSize = 32

  constructor(map: (GameWall|undefined)[][] = []) {
    super()

    this.map = map

    let maxX = 0
    let maxY = map.length
    
    map.forEach((row, x) => {
      maxX = Math.max(maxX, row.length)

      row.forEach((tail, y) => {
        if (!tail) {
          return
        }

        tail.x = x * this.gridSize
        tail.y = y * this.gridSize
        tail.width = this.gridSize
        tail.height = this.gridSize

        this.addChild(tail)
        this.walls.push(tail)
      }) 
    })

    this.width = maxX * this.gridSize
    this.height = maxY * this.gridSize
  }

  public addUnit(unit: GameUnit) {
    this.addChild(unit)
    this.units.push(unit)
  }

  public isFloor(x: number, y: number): boolean {
    const gridX = Math.ceil(x / this.gridSize)
    const gridY = Math.ceil(y / this.gridSize)
    const cell = this.map[gridX][gridY]

    return !(cell instanceof GameWall)
  }

  public draw(ctx: GameContext) {
    this.drawChild(ctx)
  }

  protected drawChild(ctx: GameContext) {
    this.units.forEach(tail => tail.draw(ctx))
    this.walls.forEach(tail => tail.draw(ctx))
  }
}