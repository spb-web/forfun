import { cityParallaxScene } from "./demo/scenes/cityParallaxScene/cityParallaxScene";
import { GameLoop } from "./engine/GameLoop";
import { firstLevel } from "./game/sceens/firstLevel";
import { loadScreen } from "./game/sceens/loadScreen";
import { secondLevel } from "./game/sceens/secondLevel";

// самый главный объект на котором все держится
const gameLoop = new GameLoop()

gameLoop.onFrameHandler = () => {}

// добавляем сцену в игру
gameLoop.addScenes(firstLevel, secondLevel, loadScreen, cityParallaxScene)
// указываем активную сцену
gameLoop.setActiveScenes('load-screen')
// запускаем отрисовку
gameLoop.start()

// загружаем игровые ресурсы
gameLoop.ctx.resources.load().then(() => {
  console.log('ресурсы загружены')
  // меняем активную сцену
  gameLoop.setActiveScenes('demo-city-parallax-screen')

  setTimeout(() => {
    gameLoop.setActiveScenes('first-level')
  }, 3000)
}).catch(console.error)
















// дальше чисто фронтовая хрень

// добавляем canvas на страницу
const canvasEl = gameLoop.ctx.canvas.getElement()
document.body.appendChild(canvasEl)

// ресайзим canvas
const resizeObserver = new ResizeObserver(([{contentRect: {width, height}}]) => {
  gameLoop.ctx.canvas
    .setWidth(width / 2)
    .setHeight(height / 2)
})

resizeObserver.observe(canvasEl)

canvasEl.style.position = 'absolute'
canvasEl.style.left = '0'
canvasEl.style.top = '0'
canvasEl.style.width = '100%'
canvasEl.style.height = '100%'
canvasEl.style.imageRendering = 'pixelated'
