import { GameLoop } from "./engine/GameLoop";
import { firstLevel } from "./game/sceens/firstLevel";
import { loadScreen } from "./game/sceens/loadScreen";

// самый главный объект на котором все держится
const gameLoop = new GameLoop()

gameLoop.onFrameHandler = () => {}

// добавляем сцену в игру
gameLoop.addScenes(firstLevel, loadScreen)
// указываем активную сцену
gameLoop.setActiveScenes('load-screen')
// запускаем отрисовку
gameLoop.start()

// загружаем игровые ресурсы
gameLoop.ctx.resources.load().then(() => {
  console.log('ресурсы загружены')
  // меняем активную сцену
  gameLoop.setActiveScenes('first-level')
}).catch(console.error)
















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
