// src/engine/GameTail.ts
var GameTail = class {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  fill = void 0;
  image = void 0;
  isFixedPosition = false;
  ctx;
  parent = null;
  child = [];
  get centerX() {
    return this.x + this.width / 2;
  }
  get centerY() {
    return this.y + this.height / 2;
  }
  setContext(ctx) {
    this.ctx = ctx;
  }
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
  isFixedPosition = false;
  effectCtx;
  constructor() {
    super();
    this.image = new OffscreenCanvas(256, 256);
    this.effectCtx = this.image.getContext("2d");
  }
  update(ctx) {
    const { width, height } = ctx.canvas.getScreenSize();
    this.width = width;
    this.height = height;
    const idata = this.effectCtx.createImageData(width, height);
    const buffer32 = new Uint32Array(idata.data.buffer);
    for (let i = 0; i < buffer32.length; i++) {
      buffer32[i] = (255 * Math.random() | 0) << 24 & 1099780128868;
    }
    this.effectCtx.putImageData(idata, 0, 0);
    const gradient = this.effectCtx.createRadialGradient(256 / 2, 256 / 2, 256 / 4, 256 / 2, 256 / 2, 256);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(1, "black");
    this.effectCtx.fillStyle = gradient;
    this.effectCtx.fillRect(0, 0, width, height);
  }
  isVisible(tail) {
    return !(tail.x + tail.width < this.x || tail.x > this.x + this.width || tail.y + tail.height < this.y || tail.y > this.y + this.height);
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

// src/engine/vector/Vec2.ts
var Vec2 = class {
  x;
  y;
  magnitude;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.magnitude = Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  /**
   * Возвращает вектор с заданной длинной
   * При нормализации вектор сохраняет то же направление, но его длина равна newMagnitude
   * @see https://docs.unity3d.com/ru/530/ScriptReference/Vector2-normalized.html
   *
   * @returns Возвращает новый вектор
   */
  normalize(newMagnitude = 1) {
    const { magnitude } = this;
    if (magnitude > 0) {
      return this.multiplyByScalar(newMagnitude / magnitude);
    }
    return this.clone();
  }
  /**
   * Вычитает из текущего вектора переданный вектор
   * 
   * @returns Возвращает новый вектор
   */
  subtract(subtrahend) {
    return Vec2.create(
      this.x - subtrahend.x,
      this.y - subtrahend.y
    );
  }
  setX(x) {
    return Vec2.create(x, this.y);
  }
  setY(y) {
    return Vec2.create(this.x, y);
  }
  mul(v) {
    return Vec2.create(this.x * v.x, this.y * v.y);
  }
  /**
   * Скалярное произведение
   * @see https://en.wikipedia.org/wiki/Dot_product
   */
  dotProduct(factor) {
    return this.x * factor.x + this.y * factor.y;
  }
  multiplyByScalar(scalar) {
    return Vec2.create(this.x * scalar, this.y * scalar);
  }
  divideByScalar(scalar) {
    return Vec2.create(this.x / scalar, this.y / scalar);
  }
  clone() {
    return Vec2.create(this.x, this.y);
  }
  static create(x = 0, y = 0) {
    return new Vec2(x, y);
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
    let x = 0;
    let y = 0;
    if (this.isActive("KeyW") || this.isActive("ArrowUp")) {
      y -= 1;
    }
    if (this.isActive("KeyS") || this.isActive("ArrowDown")) {
      y += 1;
    }
    if (this.isActive("KeyA") || this.isActive("ArrowLeft")) {
      x -= 1;
    }
    if (this.isActive("KeyD") || this.isActive("ArrowRight")) {
      x += 1;
    }
    const vector = Vec2.create(x, y).normalize();
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
  colliders = [];
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
    tails.forEach((tail) => this.bindCtx(tail));
    return this.tails.push(...tails);
  }
  bindCtx(tail) {
    tail.setContext(this.ctx);
    tail.child.forEach((children) => this.bindCtx(children));
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
    if (this.ctx.frameDuration > 34) {
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
    this.ctx.camera.draw(this.ctx);
  }
};

// src/engine/gameObject/GameCollider.ts
var e = document.createElement("div");
document.body.appendChild(e);
e.style.position = "absolute";
e.style.left = "0";
e.style.top = "0";
e.style.zIndex = "10";
var logger = (s) => e.innerHTML = s;
var GameCollider = class extends GameTail {
  collided = false;
  /**
   * Вектор ускорения объекта
   */
  velocity = Vec2.create();
  collisionVelocity = Vec2.create();
  setContext(ctx) {
    this.ctx = ctx;
    ctx.colliders.push(this);
  }
  get axisAlignedBoundingBox() {
    const { x, y, width, height } = this;
    return {
      min: new Vec2(x, y),
      max: new Vec2(width + x, height + y)
    };
  }
  /**
   * Определение пересечений по теореме о разделяющей оси
   * @see https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
   */
  checkCollided(newX, newY, second) {
    const firstAABB = {
      min: Vec2.create(newX, newY),
      max: Vec2.create(newX + this.width, newY + this.height)
    };
    const secondAABB = second.axisAlignedBoundingBox;
    const isCollided = !// x
    (firstAABB.max.x < secondAABB.min.x || firstAABB.min.x > secondAABB.max.x || (firstAABB.max.y < secondAABB.min.y || firstAABB.min.y > secondAABB.max.y));
    return isCollided;
  }
  updatePosition() {
    let newX = this.x;
    let newY = this.y;
    const speedPerFrame = this.ctx.frameDuration / 1e3;
    newX = this.x + this.velocity.x * speedPerFrame;
    newY = this.y + this.velocity.y * speedPerFrame;
    this.x = newX;
    this.y = newY;
    this.checkCollision();
  }
  checkCollision() {
    this.collided = false;
    for (const collider of this.ctx.colliders) {
      if (collider === this) {
        continue;
      }
      const d = Vec2.create(this.centerX - collider.centerX, this.centerY - collider.centerY);
      const intersectionWidth = (this.width + collider.width) / 2 - Math.abs(d.x);
      const intersectionHeight = (this.height + collider.height) / 2 - Math.abs(d.y);
      if (intersectionWidth > 0 && intersectionHeight > 0) {
        this.collided = true;
        const overlapX = intersectionWidth * Math.sign(d.x);
        const overlapY = intersectionHeight * Math.sign(d.y);
        if (overlapY !== 0)
          logger([overlapY]);
        if (Math.abs(overlapX) < Math.abs(overlapY)) {
          this.x += overlapX;
          this.collisionVelocity.setX(-this.velocity.x);
        } else {
          this.y += overlapY;
          this.collisionVelocity.setY(-this.velocity.x);
        }
      }
    }
  }
};

// src/engine/gameObject/GameWall.ts
var GameWall = class extends GameCollider {
  image = document.createElement("img");
  constructor() {
    super();
    this.image.src = "./wall.jpg";
  }
};

// src/engine/gameObject/GameFloor.ts
var GameFloor = class extends GameTail {
  image = document.createElement("img");
  constructor() {
    super();
    this.image.src = "./floor.jpg";
  }
};

// src/engine/GameMap.ts
var GameMap = class extends GameTail {
  map = [];
  walls = [];
  floors = [];
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
        tail.x = x * this.gridSize;
        tail.y = y * this.gridSize;
        tail.width = this.gridSize;
        tail.height = this.gridSize;
        this.addChild(tail);
        if (tail instanceof GameFloor) {
          this.floors.push(tail);
        } else if (tail instanceof GameWall) {
          this.walls.push(tail);
        }
      });
    });
    this.width = maxX * this.gridSize;
    this.height = maxY * this.gridSize;
  }
  addUnit(unit) {
    this.addChild(unit);
    this.units.push(unit);
  }
  draw(ctx) {
    this.drawChild(ctx);
  }
  drawChild(ctx) {
    this.floors.forEach((tail) => tail.draw(ctx));
    this.units.forEach((tail) => tail.draw(ctx));
    this.walls.forEach((tail) => tail.draw(ctx));
  }
};

// src/engine/gameObject/GameUnit.ts
var GameUnit = class extends GameCollider {
  x = 190;
  y = 190;
};

// src/engine/gameObject/GamePlayer.ts
var GamePlayer = class extends GameUnit {
  width = 50;
  height = 50;
  x = 100;
  y = 80;
  image = document.createElement("img");
  playerState = 0 /* idle */;
  constructor() {
    super();
    this.image.src = "./sprite0.png";
  }
  update(ctx) {
    const speedPerSecond = 400;
    this.velocity = ctx.keyboard.vector.normalize(speedPerSecond);
    this.fill = { style: `hsl(300, 100%, 31%)` };
    this.updatePosition();
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
  velocity = Vec2.create(Math.random() * 800 - 400, Math.random() * 800 - 400);
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
    this.updatePosition();
    if (this.collided) {
      this.velocity = Vec2.create(Math.random() * 800 - 400, Math.random() * 800 - 400);
    }
  }
};

// src/index.ts
var gameLoop = new GameLoop();
var bgTail = new BgTail();
var map = new GameMap([
  [new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall()]
]);
var demoBot = new DemoBot();
var demoBot2 = new DemoBot();
var demoBot3 = new DemoBot();
var demoBot4 = new DemoBot();
var player = new GamePlayer();
map.addUnit(demoBot);
map.addUnit(demoBot2);
map.addUnit(demoBot3);
map.addUnit(demoBot4);
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
