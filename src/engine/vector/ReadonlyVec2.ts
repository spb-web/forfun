import type { Vec2 } from "./Vec2"

/**
 * Двумерный вектор без мутабельных методов. Мутаблеьные методы
 * реализованны в классе Vec2
 * 
 * @see Vec2
 */
export class ReadonlyVec2 {
  protected vector: [number, number] = [0, 0]

  constructor(x: number = 0, y: number = 0) {
    this.vector[0] = x
    this.vector[1] = y
  }

  /**
   * Первая компонента вектора (x)
   */
  get x() {
    return this.vector[0]
  }

  /**
   * Вторая компонента вектора (y)
   */
  get y() {
    return this.vector[1]
  }

  /**
   * Длинна вектора
   */
  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }
  
  /**
   * Cоздает копию вектора
   */
  public clone() {
    return ReadonlyVec2.create(this.x, this.y)
  }

  static create(x: number = 0, y: number = 0) {
    return new ReadonlyVec2(x, y)
  }

  /**
   * Создает новый readonly вектор из Vec2
   * 
   * @see Vec2
   */
  static fromVec2(vector: Vec2) {
    return ReadonlyVec2.create(vector.x, vector.y)
  }
}
