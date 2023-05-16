import { GameContext } from "../GameContext";
import { GameTail } from "../GameTail";
import { Vec2 } from "../vector/Vec2";

const e = document.createElement('div')
document.body.appendChild(e)
e.style.position='absolute'
e.style.left='0'
e.style.top='0'
e.style.zIndex='10'
const logger = (s: any) => e.innerHTML = s

export class GameCollider extends GameTail {
  collided = false
  /**
   * Вектор ускорения объекта
   */
  public velocity = Vec2.create()

  public collisionVelocity = Vec2.create()

  public setContext(ctx: GameContext): void {
    this.ctx = ctx

    ctx.colliders.push(this)
  }

  get axisAlignedBoundingBox() {
    const {x, y, width, height} = this

    return {
      min: new Vec2(x, y),
      max: new Vec2(width + x, height + y),
    }
  }

  /**
   * Определение пересечений по теореме о разделяющей оси
   * @see https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
   */
  public checkCollided(newX: number, newY: number, second: GameCollider): boolean {
    const firstAABB = {
      min: Vec2.create(newX, newY),
      max: Vec2.create(newX + this.width, newY + this.height)
    }
    const secondAABB = second.axisAlignedBoundingBox
    const isCollided = !(
      // x
      (firstAABB.max.x < secondAABB.min.x || firstAABB.min.x > secondAABB.max.x)
      // y
      || (firstAABB.max.y < secondAABB.min.y || firstAABB.min.y > secondAABB.max.y)
    )

    return isCollided
  }

  updatePosition() {
    // Check collisions with objects
    let newX = this.x
    let newY = this.y
    const speedPerFrame = this.ctx.frameDuration / 1000

    newX = this.x + this.velocity.x * speedPerFrame
    newY = this.y + this.velocity.y * speedPerFrame

    // Update player's position
    this.x = newX;
    this.y = newY;

    this.checkCollision()
  }

  checkCollision(): void {
    this.collided = false
    for (const collider of this.ctx.colliders) {
      if (collider === this) {
        continue
      }
      // Обнаружено столкновение
      const d = Vec2.create(this.centerX - collider.centerX, this.centerY - collider.centerY)

      const intersectionWidth = (this.width + collider.width) / 2 - Math.abs(d.x);
      const intersectionHeight = (this.height + collider.height) / 2 - Math.abs(d.y);


      if (intersectionWidth > 0 && intersectionHeight > 0) {
        this.collided = true
        // Вычисление перекрытия по осям
        const overlapX = intersectionWidth * Math.sign(d.x);
        const overlapY = intersectionHeight * Math.sign(d.y);

        if (overlapY !== 0)
        logger([overlapY])

        // Применение коррекции позиции игрока
        if (Math.abs(overlapX) < Math.abs(overlapY)) {
          this.x += overlapX;
          this.collisionVelocity.setX(-this.velocity.x)
        } else {
          this.y += overlapY;
          this.collisionVelocity.setY(-this.velocity.x)
        }
      }
    }
  }
}