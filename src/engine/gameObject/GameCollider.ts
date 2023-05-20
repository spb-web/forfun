import { GameTail } from "../GameTail";
import { Vec2 } from "../vector/Vec2";

export class GameCollider extends GameTail {
  collided = false
  /**
   * Вектор ускорения объекта
   */
  public velocity = Vec2.create()

  public collisionVelocity = Vec2.create()
  
  public init(): void {
    this.scene.colliders.push(this)
  }

  // /**
  //  * Определение пересечений по теореме о разделяющей оси
  //  * @see https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
  //  */
  // public checkCollided(newX: number, newY: number, second: GameCollider): boolean {
  //   const firstAABB = {
  //     min: Vec2.create(newX, newY),
  //     max: Vec2.create(newX + this.width, newY + this.height)
  //   }
  //   const secondAABB = second.axisAlignedBoundingBox
  //   const isCollided = !(
  //     // x
  //     (firstAABB.max.x < secondAABB.min.x || firstAABB.min.x > secondAABB.max.x)
  //     // y
  //     || (firstAABB.max.y < secondAABB.min.y || firstAABB.min.y > secondAABB.max.y)
  //   )

  //   return isCollided
  // }

  updatePosition() {
    const {scene: {ctx}} = this

    // Check collisions with objects
    let newX = this.x
    let newY = this.y
    const speedPerFrame = ctx.frameDuration / 1000

    newX = this.x + this.velocity.x * speedPerFrame
    newY = this.y + this.velocity.y * speedPerFrame

    // Update player's position
    this
      .setX(newX)
      .setY(newY)
      .checkCollision()
  }

  checkCollision(): void {
    this.collided = false
    for (const collider of this.scene.colliders) {
      if (collider === this) {
        continue
      }
      // Обнаружено столкновение
      const d = Vec2.fromReadonlyVec2(this.center).subtract(collider.center)

      const intersectionWidth = (this.width + collider.width) / 2 - Math.abs(d.x);
      const intersectionHeight = (this.height + collider.height) / 2 - Math.abs(d.y);


      if (intersectionWidth > 0 && intersectionHeight > 0) {
        this.collided = true
        // Вычисление перекрытия по осям
        const overlapX = intersectionWidth * Math.sign(d.x);
        const overlapY = intersectionHeight * Math.sign(d.y);

        // Применение коррекции позиции игрока
        if (Math.abs(overlapX) < Math.abs(overlapY)) {
          this.setX(this.x + overlapX)
          // this.collisionVelocity.setX(-this.velocity.x)
        } else {
          this.setY(this.y + overlapY)
          // this.collisionVelocity.setY(-this.velocity.x)
        }
      }
    }
  }
}