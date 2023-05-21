import { ReadonlyVec2 } from "./vector/ReadonlyVec2";
import { Vec2 } from "./vector/Vec2";

/**
 * Реализует AABB  "Axis-Aligned Bounding Box" (соответствующий осям
 * ограничивающий параллелепипед). AABB является простой формой
 * ограничения, используемой в компьютерной графике и игровой
 * разработке для приближенного представления формы объекта или
 * группы объектов.
 */
export class Box {
  /**
   * Левая верхняя точка
   */
  private min: Vec2 = Vec2.create()
   /**
   * Правая нижняя точка
   */
  private max: Vec2 = Vec2.create()

  public get x() {
    return this.min.x
  }

  public get y() {
    return this.min.y
  }

  public get width(): number {
    return this.max.x - this.min.x
  }

  public get height(): number {
    return this.max.y - this.min.y
  }

  public setX(x: number): this {
    const {width} = this

    this.min.setX(x)
    this.max.setX(x + width)

    return this
  }

  public setY(y: number): this {
    const {height} = this

    this.min.setY(y)
    this.max.setY(y + height)

    return this
  }

  public setWidth(width: number): this {
    this.max.setX(this.min.x + width)

    return this
  }

  public setHeight(height: number): this {
    this.max.setY(this.min.y + height)

    return this
  }

  public checkCollided(box: Box): boolean {
    const isCollided = !(
      // x
      (this.max.x < box.min.x || this.min.x > box.max.x)
      // y
      || (this.max.y < box.min.y || this.min.y > box.max.y)
    )

    return isCollided
  }

  public get center(): ReadonlyVec2 {
    return ReadonlyVec2.fromVec2(
      this.max
        .clone()
        .subtract(this.min)
        .divideByScalar(2)
        .add(this.min)
    )
  }

  static create() {
    return new Box()
  }

  static from(entity: Box) {
    return Box
      .create()
      .setHeight(entity.height)
      .setWidth(entity.width)
      .setX(entity.x)
      .setY(entity.y)
  }
}
