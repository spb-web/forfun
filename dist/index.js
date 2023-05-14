// src/engine/GameTail.ts
var GameTail = class {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  fill = void 0;
  image = void 0;
  isFixedPosition = false;
  parent = null;
  child = [];
  setParent(tail) {
    this.parent = tail;
  }
  addChild(...child) {
    child.forEach((tail) => tail.setParent(this));
    return this.child.push(...child);
  }
  update(ctx) {
    this.child.forEach((tail) => tail.update(ctx));
  }
  draw(ctx) {
    if (!ctx.camera.isVisible(this)) {
      return;
    }
    let x = this.x;
    let y = this.y;
    if (!this.isFixedPosition) {
      x -= ctx.camera.x;
      y -= ctx.camera.y;
    }
    ctx.canvas.drawRectangle({
      x,
      y,
      width: this.width,
      height: this.height,
      fill: this.fill,
      image: this.image
    });
    this.drawChild(ctx);
  }
  drawChild(ctx) {
    this.child.forEach((tail) => {
      tail.draw(ctx);
    });
  }
};

// src/engine/GameCamera.ts
var GameCamera = class extends GameTail {
  fill = { style: "transparent" };
  update(ctx) {
    const { width, height } = ctx.canvas.getScreenSize();
    this.width = width;
    this.height = height;
  }
  isVisible(tail) {
    return !(tail.x + tail.width < this.x || tail.x > this.x + this.width || tail.y + tail.height < this.y || tail.y > this.y + this.height);
  }
  draw(ctx) {
    ctx.canvas.drawRectangle({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      fill: this.fill
    });
    this.drawChild(ctx);
  }
};

// src/engine/GameCanvas2d.ts
var assertReturn = (v, message = "value is nil") => {
  if (!v) {
    throw new Error(message);
  }
  return v;
};
var GameCanvas2d = class {
  canvas = document.createElement("canvas");
  ctx2d = assertReturn(this.canvas.getContext("2d"), "can not create 2d context");
  getElement() {
    return this.canvas;
  }
  getScreenSize() {
    return {
      width: this.canvas.width,
      height: this.canvas.height
    };
  }
  get width() {
    return this.canvas.width;
  }
  get height() {
    return this.canvas.height;
  }
  resize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
  }
  clear() {
    this.drawRectangle({
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height,
      fill: {
        style: "#000"
      }
    });
  }
  drawRectangle({ x, y, width, height, fill, image }) {
    if (fill) {
      this.fill(fill);
      this.ctx2d.fillRect(x, y, width, height);
    }
    if (image) {
      this.ctx2d.drawImage(image, x, y, width, height);
    }
  }
  fill(fill) {
    this.ctx2d.fillStyle = fill.style;
  }
};

// src/engine/GameKeyboard.ts
var GameKeyboard = class {
  active = {};
  constructor() {
    window.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("keyup", this.handleKeyup);
  }
  isActive(code) {
    return this.active[code] ?? false;
  }
  // единичный вектор направления движения
  get vector() {
    const vector = [0, 0];
    if (this.isActive("KeyW") || this.isActive("ArrowUp")) {
      vector[1] -= 1;
    }
    if (this.isActive("KeyS") || this.isActive("ArrowDown")) {
      vector[1] += 1;
    }
    if (this.isActive("KeyA") || this.isActive("ArrowLeft")) {
      vector[0] -= 1;
    }
    if (this.isActive("KeyD") || this.isActive("ArrowRight")) {
      vector[0] += 1;
    }
    const vectorLength = Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
    if (vectorLength > 0) {
      vector[0] = vector[0] / vectorLength;
      vector[1] = vector[1] / vectorLength;
    }
    return vector;
  }
  handleKeydown = (event) => {
    this.active[event.code] = true;
  };
  handleKeyup = (event) => {
    this.active[event.code] = false;
  };
};

// src/engine/GameContext.ts
var GameContext = class {
  keyboard = new GameKeyboard();
  canvas = new GameCanvas2d();
  camera = new GameCamera();
  frame = {
    time: Date.now(),
    duration: 0
  };
  get time() {
    return this.frame.time;
  }
  get frameDuration() {
    return this.frame.duration;
  }
  onFrame() {
    const time = Date.now();
    this.frame.duration = time - this.frame.time;
    this.frame.time = time;
  }
};

// src/engine/GameLoop.ts
var GameLoop = class {
  ctx = new GameContext();
  onFrameHandler = () => {
  };
  isStarted = false;
  tails = [];
  addTiles(...tails) {
    return this.tails.push(...tails);
  }
  start() {
    if (this.isStarted) {
      throw new Error("Already started");
    }
    this.isStarted = true;
    requestAnimationFrame(() => {
      this.onFrame();
    });
  }
  onFrame() {
    this.ctx.onFrame();
    this.ctx.camera.update(this.ctx);
    this.tails.forEach((tail) => {
      tail.update(this.ctx);
    });
    this.onFrameHandler(this.ctx);
    if (this.ctx.frameDuration > 60) {
      console.warn("onFrame executing is too long");
    }
    this.draw();
    requestAnimationFrame(() => {
      this.onFrame();
    });
  }
  draw() {
    this.ctx.canvas.clear();
    this.tails.forEach((tail) => {
      tail.draw(this.ctx);
    });
  }
};

// src/engine/GameWall.ts
var GameWall = class extends GameTail {
  image = document.createElement("img");
  constructor() {
    super();
    this.image.src = "./wall.jpg";
  }
};

// src/engine/GameMap.ts
var GameMap = class extends GameTail {
  map = [];
  walls = [];
  units = [];
  gridSize = 32;
  constructor(map2 = []) {
    super();
    this.map = map2;
    let maxX = 0;
    let maxY = map2.length;
    map2.forEach((row, x) => {
      maxX = Math.max(maxX, row.length);
      row.forEach((tail, y) => {
        if (!tail) {
          return;
        }
        tail.x = x * this.gridSize;
        tail.y = y * this.gridSize;
        tail.width = this.gridSize;
        tail.height = this.gridSize;
        this.addChild(tail);
        this.walls.push(tail);
      });
    });
    this.width = maxX * this.gridSize;
    this.height = maxY * this.gridSize;
  }
  addUnit(unit) {
    this.addChild(unit);
    this.units.push(unit);
  }
  isFloor(x, y) {
    const gridX = Math.ceil(x / this.gridSize);
    const gridY = Math.ceil(y / this.gridSize);
    const cell = this.map[gridX][gridY];
    return !(cell instanceof GameWall);
  }
  draw(ctx) {
    this.drawChild(ctx);
  }
  drawChild(ctx) {
    this.units.forEach((tail) => tail.draw(ctx));
    this.walls.forEach((tail) => tail.draw(ctx));
  }
};

// src/engine/gameObject/GameUnit.ts
var GameUnit = class extends GameTail {
  moveTo(x, y) {
    if (this.parent.isFloor(x, y)) {
      this.x = x;
      this.y = y;
      return true;
    }
    return false;
  }
};

// src/engine/gameObject/GamePlayer.ts
var GamePlayer = class extends GameUnit {
  width = 50;
  height = 50;
  x = 100;
  y = 100;
  image = document.createElement("img");
  playerState = 0 /* idle */;
  constructor() {
    super();
    this.image.src = "./sprite0.png";
  }
  update(ctx) {
    const vector = ctx.keyboard.vector;
    const speedPerSecond = 400;
    const speedPerFrame = speedPerSecond * ctx.frameDuration / 1e3;
    this.moveTo(
      this.x + vector[0] * speedPerFrame,
      this.y + vector[1] * speedPerFrame
    );
    this.fill = { style: `hsl(300, 100%, 31%)` };
  }
};

// src/engine/GameTween.ts
var GameTween = class {
  constructor(currentValue = 0, from = 330, to = 390, duration = 5e3) {
    this.currentValue = currentValue;
    this.from = from;
    this.to = to;
    this.duration = duration;
  }
  calc(time) {
    this.currentValue = this.from + Math.abs(Math.sin(time % this.duration / this.duration * Math.PI)) * (this.to - this.from);
    return this.currentValue;
  }
};

// src/game/BgTail.ts
var BgTail = class extends GameTail {
  x = 0;
  y = 0;
  width = 10;
  height = 10;
  gameTween = new GameTween();
  isFixedPosition = true;
  update(ctx) {
    super.update(ctx);
    const { width, height } = ctx.canvas.getScreenSize();
    this.width = width;
    this.height = height;
    this.fill = { style: `hsl(${this.gameTween.calc(ctx.time)}, 100%, 31%)` };
  }
};

// src/game/DemoBot.ts
function assert(v) {
  if (!v) {
    throw new Error("value is nil");
  }
}
var DemoBot = class extends GameUnit {
  vx = Math.random() * 50 - 25;
  vy = Math.random() * 50 - 25;
  fill = void 0;
  image = document.createElement("img");
  constructor() {
    super();
    this.image.src = "./sprite0.png";
  }
  update(ctx) {
    const { parent } = this;
    this.image.src = `./sprite${Math.ceil(ctx.time / 1e3) % 3}.png`;
    assert(parent);
    this.width = 50;
    this.height = 50;
    const isMoved = this.moveTo(this.x + this.vx, this.y + this.vy);
    if (!isMoved) {
      this.vx = Math.random() * 50 - 25;
      this.vy = Math.random() * 50 - 25;
    }
  }
};

// src/index.ts
var gameLoop = new GameLoop();
var bgTail = new BgTail();
var map = new GameMap([
  [new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), new GameWall(), new GameWall(), void 0, void 0, new GameWall(), new GameWall(), new GameWall(), new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), void 0, void 0, void 0, void 0, new GameWall(), void 0, void 0, void 0, void 0, void 0, void 0, void 0, new GameWall()],
  [new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall()]
]);
var demoBot = new DemoBot();
var demoBot2 = new DemoBot();
var player = new GamePlayer();
map.addUnit(demoBot);
map.addUnit(demoBot2);
map.addUnit(player);
gameLoop.addTiles(bgTail, map);
gameLoop.onFrameHandler = (ctx) => {
  ctx.camera.x = player.x - ctx.canvas.width / 2;
  ctx.camera.y = player.y - ctx.canvas.height / 2;
  ctx.camera.x += Math.sin(ctx.time / 1e3) * 10;
  ctx.camera.y += Math.cos(ctx.time / 1e3) * 10;
};
gameLoop.ctx.canvas.resize(800, 600);
var canvasEl = gameLoop.ctx.canvas.getElement();
document.body.appendChild(canvasEl);
var resizeObserver = new ResizeObserver(([{ contentRect: { width, height } }]) => {
  gameLoop.ctx.canvas.resize(width, height);
});
resizeObserver.observe(canvasEl);
canvasEl.style.position = "absolute";
canvasEl.style.left = "0";
canvasEl.style.top = "0";
canvasEl.style.width = "100%";
canvasEl.style.height = "100%";
gameLoop.start();
