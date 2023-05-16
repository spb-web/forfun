import { GameLoop } from "./engine/GameLoop";
import { GameMap } from "./engine/GameMap";
import { GameFloor } from "./engine/gameObject/GameFloor";
import { GamePlayer } from "./engine/gameObject/GamePlayer";
import { GameWall } from "./engine/gameObject/GameWall";
import { BgTail } from "./game/BgTail";
import { DemoBot } from "./game/DemoBot";

// самый главный объект на котором все держится
const gameLoop = new GameLoop()

// фон, цветной прямоугольник
const bgTail = new BgTail()

// карта
const map = new GameMap([
  [new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall(),new GameWall()],
])

// типо бот1
const demoBot = new DemoBot()
// типо бот2
const demoBot2 = new DemoBot()
// типо бот3
const demoBot3 = new DemoBot()
// типо бот4
const demoBot4 = new DemoBot()
// типо игрок
const player = new GamePlayer()

map.addUnit(demoBot)
map.addUnit(demoBot2)
map.addUnit(demoBot3)
map.addUnit(demoBot4)
map.addUnit(player)

// добавляем bgTail в цикл отрисовки
gameLoop.addTiles(bgTail, map)

gameLoop.onFrameHandler = (ctx) => {
  ctx.camera.x = player.x - ctx.canvas.width / 2
  ctx.camera.y = player.y - ctx.canvas.height / 2
  // каждый фрейм двигаем камеру
  ctx.camera.x += Math.sin(ctx.time / 1000) * 10
  ctx.camera.y += Math.cos(ctx.time / 1000) * 10
}

// ресайзим canvas
gameLoop.ctx.canvas.resize(800, 600)

// добавляем canvas на страницу
const canvasEl = gameLoop.ctx.canvas.getElement()
document.body.appendChild(canvasEl)

const resizeObserver = new ResizeObserver(([{contentRect: {width, height}}]) => {
  gameLoop.ctx.canvas.resize(width, height)
})

resizeObserver.observe(canvasEl)

canvasEl.style.position = 'absolute'
canvasEl.style.left = '0'
canvasEl.style.top = '0'
canvasEl.style.width = '100%'
canvasEl.style.height = '100%'

// запускаем отрисовку
gameLoop.start()