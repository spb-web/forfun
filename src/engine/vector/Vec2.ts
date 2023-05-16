export class Vec2 {
  public readonly x: number
  public readonly y: number
  public readonly magnitude: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
    this.magnitude = Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  /**
   * Возвращает вектор с заданной длинной
   * При нормализации вектор сохраняет то же направление, но его длина равна newMagnitude
   * @see https://docs.unity3d.com/ru/530/ScriptReference/Vector2-normalized.html
   *
   * @returns Возвращает новый вектор
   */
  public normalize(newMagnitude = 1): Vec2 {
    const {magnitude} = this

    if (magnitude > 0) {  
      return this.multiplyByScalar(newMagnitude / magnitude)
    }

    return this.clone()
  }

  /**
   * Вычитает из текущего вектора переданный вектор
   * 
   * @returns Возвращает новый вектор
   */ 
  public subtract(subtrahend: Vec2): Vec2 {
    return Vec2.create(
      this.x - subtrahend.x,
      this.y - subtrahend.y
    )
  }

  public setX(x: number) {
    return Vec2.create(x, this.y)
  }

  public setY(y: number) {
    return Vec2.create(this.x, y)
  }
  
  public mul(v: Vec2) {
    return Vec2.create(this.x * v.x, this.y * v.y)
  }

  /**
   * Скалярное произведение
   * @see https://en.wikipedia.org/wiki/Dot_product
   */
  public dotProduct(factor: Vec2) {
    return (this.x * factor.x) + (this.y * factor.y)
  }

  public multiplyByScalar(scalar: number): Vec2 {
   return Vec2.create(this.x * scalar, this.y * scalar)
  }

  public divideByScalar(scalar: number): Vec2 {
    return Vec2.create(this.x / scalar, this.y / scalar)
  }

  public clone() {
    return Vec2.create(this.x, this.y)
  }

  static create(x: number = 0, y: number = 0) {
    return new Vec2(x, y)
  }
}
