export class GameTween {
  constructor(
    public currentValue: number = 0,
    public from = 330,
    public to = 390,
    public duration: number = 5000,
  ) {}

  calc(time: number) {
    this.currentValue = this.from + Math.abs(Math.sin((time % this.duration) / this.duration * Math.PI)) * (this.to - this.from)

    return this.currentValue
  }
}
