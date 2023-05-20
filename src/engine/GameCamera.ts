import { GameContext } from "./GameContext";
import { GameTail } from "./GameTail";
export class GameCamera extends GameTail {
  isFixedPosition = false

  private effectCtx: OffscreenCanvasRenderingContext2D

  constructor() {
    super()
    this.image = new OffscreenCanvas(256, 256);

    // @ts-ignore
    this.effectCtx = this.image.getContext("2d")
  }

  update(ctx: GameContext): void {
    const {width, height} = ctx.canvas.getScreenSize()
    
    this
      .setWidth(width)
      .setHeight(height)

    const idata = this.effectCtx.createImageData(width, height)

    // Creating Uint32Array typed array
    const buffer32 = new Uint32Array(idata.data.buffer)
        
    for (let i=0 ; i < buffer32.length; i++) {
      buffer32[i] = (((255 * Math.random()) | 0) << 24) & 0x10010010064
    }
          
    /* The putImageData() method puts the image
    data (from a specified ImageData object)
    back onto the canvas. */
    this.effectCtx.putImageData(idata, 0, 0); 

    const gradient = this.effectCtx.createRadialGradient(256/2, 256/2, 256/4, 256/2, 256/2, 256)

    // Add three color stops
    gradient.addColorStop(0, "transparent")
    gradient.addColorStop(1, "black")
    
    // Set the fill style and draw a rectangle
    this.effectCtx.fillStyle = gradient
    this.effectCtx.fillRect(0, 0, width, height)
  }

  static create() {
    return new GameCamera()
  }
}
