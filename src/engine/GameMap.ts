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

  public addUnit(unit: GameUnit) {
    this.addChild(unit)
    this.units.push(unit)
  }

  public addWall(wall: GameWall) {
    this.addChild(wall)
    this.walls.push(wall)
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