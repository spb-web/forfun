import { GameContext } from "./GameContext";
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

  public draw(ctx: GameContext) {
    this.drawChild(ctx)
  }

  protected drawChild(ctx: GameContext) {
    this.floors.forEach(tail => tail.draw(ctx))
    this.units.forEach(tail => tail.draw(ctx))
    this.walls.forEach(tail => tail.draw(ctx))
  }
}