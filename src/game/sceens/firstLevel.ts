import { GameMap } from "../../engine/GameMap";
import { Floor } from "../Floor";
import { Wall } from "../Wall";
import { BgTail } from "../BgTail";
import { Car } from "../Car";
import { DemoBot } from "../DemoBot";
import { GameCamera } from "../../engine/GameCamera";
import { Player } from "../Player";
import { GameScene } from "../../engine/GameScene";
import { Vec2 } from "../../engine/vector/Vec2";

// игровая сцена
export const firstLevel = new GameScene('first-level')

// фон, цветной прямоугольник
const bgTail = new BgTail()

// карта
const map = new GameMap([
  [new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Wall(),new Wall(),new Wall(),new Wall(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(),new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall(),new Wall()],
])

// типо бот1
const demoBot = new DemoBot()
// типо бот2
const demoBot2 = new DemoBot()
// типо бот3
const demoBot3 = new DemoBot()
// типо бот4
const demoBot4 = new DemoBot()
// типо бот5
const demoBot5 = new DemoBot()
// типо бот6
const demoBot6 = new DemoBot()
// типо игрок
const player = new Player()
// типо тачка
const car = new Car()

// добавляем bgTail в сцену
firstLevel.addTiles(
    bgTail,
    map.addUnits(
      demoBot.setX(100).setY(100),
      demoBot2.setX(100).setY(100),
      demoBot3.setX(100).setY(100),
      demoBot4.setX(100).setY(100),
      demoBot5.setX(100).setY(100),
      demoBot6.setX(100).setY(100),
      player.setX(100).setY(80),
      car.setX(650).setY(80),
    ),
  )

// Добавляем камеру сцены
firstLevel.setCamera(GameCamera.create())

firstLevel.onFrameHandler = (ctx) => {
    // каждый фрейм двигаем камеру
    const cameraPosition = Vec2
      .create(
        Math.sin(ctx.time / 1000) * 10,
        Math.cos(ctx.time / 1000) * 10,
      )
      .add(player.center)
      .subtract(ctx.canvas.center)

    firstLevel.camera
      .setX(cameraPosition.x)
      .setY(cameraPosition.y)
  }
