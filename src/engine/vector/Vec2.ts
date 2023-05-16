import { ReadonlyVec2 } from "./ReadonlyVec2"

/**
 * Двумерный вектор c мутабельными методами.
 */
export class Vec2 extends ReadonlyVec2 {
  constructor(x: number = 0, y: number = 0) {
    super(x, y)
  }

  /**
   * Установка первой компоненты вектора (x)
   */
  public setX(x: number) {
    this.vector[0] = x

    return this
  }

  /**
   * Установка второй компоненты вектора (y)
   */
  public setY(y: number) {
    this.vector[1] = y

    return this
  }

  /**
   * Возвращает вектор с заданной длинной
   * При нормализации вектор сохраняет то же направление, но его длина равна newMagnitude
   * @see https://docs.unity3d.com/ru/530/ScriptReference/Vector2-normalized.html
   */
  public normalize(newMagnitude = 1): this {
    const {magnitude} = this

    if (magnitude > 0) {  
      return this.multiplyByScalar(newMagnitude / magnitude)
    }

    return this
  }

  /**
   * Вычитает из текущего вектора переданный вектор
   */ 
  public subtract(subtrahend: ReadonlyVec2): this {
    return this.setX(this.x - subtrahend.x).setY(this.y - subtrahend.y)
  }
  
  /**
   * Умножает вектор на переданный вектор
   */
  public mul(vector: ReadonlyVec2) {
    return this.setX(this.x * vector.x).setY(this.y * vector.y)
  }

  /**
   * Складывет вектор с переданным вектором
   */
  public add(vector: ReadonlyVec2) {
    return this.setX(this.x + vector.x).setY(this.y + vector.y)
  }

  /**
   * Скалярное произведение
   * @see https://en.wikipedia.org/wiki/Dot_product
   */
  public dotProduct(factor: ReadonlyVec2): number {
    return (this.x * factor.x) + (this.y * factor.y)
  }

  /**
   * Умножает вектор на скаляр
   */
  public multiplyByScalar(scalar: number): this {
   return this.setX(this.x * scalar).setY(this.y * scalar)
  }

  /**
   * Делит вектор на скаляр
   */
  public divideByScalar(scalar: number): this {
    return this.setX(this.x / scalar).setY(this.y / scalar)
  }

  /**
   * Cоздает копию вектора
   */
  public clone() {
    return Vec2.create(this.x, this.y)
  }

  /**
   * Создает новый вектор
   */
  static create(x: number = 0, y: number = 0) {
    return new Vec2(x, y)
  }

  /**
   * Создает новый вектор из ReadonlyVec2
   * @see ReadonlyVec2
   */
  static fromReadonlyVec2(vector: ReadonlyVec2) {
    return Vec2.create(vector.x, vector.y)
  }
}
