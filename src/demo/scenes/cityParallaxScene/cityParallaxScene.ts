import { GameScene } from "../../../engine/GameScene";
import { GameCamera } from "../../../engine/GameCamera";
import { CityParallaxBackground } from "./CityParallaxBackground";

// игровая сцена
export const cityParallaxScene = new GameScene('demo-city-parallax-screen')

const background = new CityParallaxBackground()
const camera = new GameCamera()

cityParallaxScene.addTiles(background)
cityParallaxScene.setCamera(camera)
