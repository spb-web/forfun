import { GameLoop } from "./engine/GameLoop";
import { GameMap } from "./engine/GameMap";
import { Floor } from "./game/Floor";
import { Wall } from "./game/Wall";
import { Vec2 } from "./engine/vector/Vec2";
import { BgTail } from "./game/BgTail";
import { Car } from "./game/Car";
import { DemoBot } from "./game/DemoBot";
import { GameCamera } from "./engine/GameCamera";
import { Player } from "./game/Player";
import { LoadScreen } from "./game/LoadScreen";

// самый главный объект на котором все держится
const gameLoop = new GameLoop()

const loadScreen = new LoadScreen()

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

// добавляем bgTail в цикл отрисовки
gameLoop
  .addTiles(
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
    loadScreen,
  )
  .setCamera(GameCamera.create())
  .onFrameHandler = (ctx) => {
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


// запускаем отрисовку
gameLoop.start()


// дальше чисто фронтовая хрень

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




gameLoop.ctx.resources.load().then(() => {
  console.log('ресурсы загружены')
}).catch(console.error)