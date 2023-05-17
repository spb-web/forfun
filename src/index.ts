import { GameLoop } from "./engine/GameLoop";
import { GameMap } from "./engine/GameMap";
import { GameFloor } from "./engine/gameObject/GameFloor";
import { GamePlayer } from "./engine/gameObject/GamePlayer";
import { GameWall } from "./engine/gameObject/GameWall";
import { Vec2 } from "./engine/vector/Vec2";
import { BgTail } from "./game/BgTail";
import { Car } from "./game/Car";
import { DemoBot } from "./game/DemoBot";

// самый главный объект на котором все держится
const gameLoop = new GameLoop()

// фон, цветной прямоугольник
const bgTail = new BgTail()

// карта
const map = new GameMap([
  [new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameWall(),new GameWall(),new GameWall(),new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall()],
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
const player = new GamePlayer()
// типо тачка
const car = new Car()

map.addUnit(demoBot.setX(100).setY(100))
map.addUnit(demoBot2.setX(100).setY(100))
map.addUnit(demoBot3.setX(100).setY(100))
map.addUnit(demoBot4.setX(100).setY(100))
map.addUnit(demoBot5.setX(100).setY(100))
map.addUnit(demoBot6.setX(100).setY(100))
map.addUnit(player.setX(100).setY(80))
map.addWall(car.setX(650).setY(80))

// добавляем bgTail в цикл отрисовки
gameLoop.addTiles(bgTail, map)

gameLoop.onFrameHandler = (ctx) => {
  // каждый фрейм двигаем камеру
  const cameraPosition = Vec2
    .create(
      Math.sin(ctx.time / 1000) * 10,
      Math.cos(ctx.time / 1000) * 10,
    )
    .add(player.center)
    .subtract(ctx.canvas.center)

  ctx.camera
    .setX(cameraPosition.x)
    .setY(cameraPosition.y)
}

// добавляем canvas на страницу
const canvasEl = gameLoop.ctx.canvas.getElement()
document.body.appendChild(canvasEl)

// ресайзим canvas
const resizeObserver = new ResizeObserver(([{contentRect: {width, height}}]) => {
  gameLoop.ctx.canvas
    .setWidth(width)
    .setHeight(height)
})

resizeObserver.observe(canvasEl)

canvasEl.style.position = 'absolute'
canvasEl.style.left = '0'
canvasEl.style.top = '0'
canvasEl.style.width = '100%'
canvasEl.style.height = '100%'

// запускаем отрисовку
gameLoop.start()