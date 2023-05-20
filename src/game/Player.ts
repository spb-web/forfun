import { GameContext } from "../engine/GameContext";
import { GameTail } from "../engine/GameTail";
import { GamePlayer } from "../engine/gameObject/GamePlayer";

export class Player extends GamePlayer {
  /** Тайл с эффектом свечения */
  private glow = new GameTail()
  /** Тайл с текстурой игрока */
  private character = new GameTail()

  init() {
    super.init()

    const {scene: {ctx}} = this

    // Добавляем текстуру игрока в менеджер ресурсов
    ctx.resources.add('player-character', './sprite0.png')
    // Применяем текстуру игрока из менеджера ресурсов
    this.character.image = ctx.resources.images.get('player-character')

    // добавляем тайл со свечением и текстурой игрока как дочерние элементы игрока
    this.addChild(
      this.glow.setWidth(450).setHeight(450).setX(-225).setY(-225),
      this.character.setWidth(50).setHeight(50).setX(0).setY(0)
    )
  }

  public update(): void {
    super.update()

    const {scene: {camera, ctx}} = this

    // создаем градиент для эффекта свечения
    const glowGradient = ctx.canvas.ctx2d.createRadialGradient(
      this.center.x - camera.x,
      this.center.y - camera.y,
      0,
      this.center.x - camera.x,
      this.center.y - camera.y,
      200,
    )
    glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
    glowGradient.addColorStop(1, 'transparent')

    // Применяем градиент к тайлу для отрисовки
    this.glow.fill = {
      style: glowGradient
    }
  }
}