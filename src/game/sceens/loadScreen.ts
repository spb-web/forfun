import { GameScene } from "../../engine/GameScene";
import { ProgressBarTail } from "../ProgressBarTail";
import { GameCamera } from "../../engine/GameCamera";

// игровая сцена
export const loadScreen = new GameScene('load-screen')

const progress = new ProgressBarTail()
const camera = new GameCamera()

loadScreen.addTiles(progress)
loadScreen.setCamera(camera)
