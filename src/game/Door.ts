import { GameFloor } from "../engine/gameObject/GameFloor";

export class Door extends GameFloor {
  sceneId: string
  constructor(sceneId: string) {
    super()

    this.sceneId = sceneId;
  }

  public update(): void {
    // Если игрок коснулся двери, то меняем сцену
    if (this.scene.player && this.checkCollided(this.scene.player)) {
      // Этот метод, получается, почти везде доступен. Тут для примера вызывается смена сцены при пересечение игрока с объектом
      this.scene.ctx.loop.setActiveScenes(this.sceneId)
      // Сдвигаем игрока на прошлой сцене что бы при возвращение он не папал в бесконечный цикл перемещений))
      this.scene.player.setX(100).setY(80)
    }
  }

  init() {
    super.init()

    const {scene: {ctx}} = this
    ctx.resources.add('door', './door.jpg')
    this.image = ctx.resources.images.get('door')
  }
}