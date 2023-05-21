import { GameMap } from "../../engine/GameMap";
import { Floor } from "../Floor";
import { Wall } from "../Wall";
import { BgDarkTail } from "../BgDarkTail";
import { GameCamera } from "../../engine/GameCamera";
import { Player } from "../Player";
import { GameScene } from "../../engine/GameScene";
import { Vec2 } from "../../engine/vector/Vec2";
import { Door } from "../Door";

// игровая сцена
export const secondLevel = new GameScene('second-level')

// фон, цветной прямоугольник
const bgTail = new BgDarkTail()

// карта
const map = new GameMap([
  [new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall()],
  [new Wall(),new Door('first-level'),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Wall(),new Wall(),new Wall(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall()],
])

// типо игрок
const player = new Player()

// добавляем bgTail в сцену
secondLevel.addTiles(
    bgTail,
    map.addUnits(
      player.setX(100).setY(80),
    ),
  )

secondLevel.setPayer(player)

// Добавляем камеру сцены
secondLevel.setCamera(GameCamera.create())

secondLevel.onFrameHandler = (ctx) => {
    // каждый фрейм двигаем камеру
    const cameraPosition = Vec2
      .create(
        Math.sin(ctx.time / 1000) * 50,
        Math.cos(ctx.time / 1000) * 10,
      )
      .add(player.center)
      .subtract(ctx.canvas.center)

    secondLevel.camera
      .setX(cameraPosition.x)
      .setY(cameraPosition.y)
  }
