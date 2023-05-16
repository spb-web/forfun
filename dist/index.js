// src/engine/vector/ReadonlyVec2.ts
var ReadonlyVec2 = class {
  vector = [0, 0];
  constructor(x = 0, y = 0) {
    this.vector[0] = x;
    this.vector[1] = y;
  }
  /**
   * Первая компонента вектора (x)
   */
  get x() {
    return this.vector[0];
  }
  /**
   * Вторая компонента вектора (y)
   */
  get y() {
    return this.vector[1];
  }
  /**
   * Длинна вектора
   */
  get magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  /**
   * Cоздает копию вектора
   */
  clone() {
    return ReadonlyVec2.create(this.x, this.y);
  }
  static create(x = 0, y = 0) {
    return new ReadonlyVec2(x, y);
  }
  /**
   * Создает новый readonly вектор из Vec2
   * 
   * @see Vec2
   */
  static fromVec2(vector) {
    return ReadonlyVec2.create(vector.x, vector.y);
  }
};

// src/engine/vector/Vec2.ts
var Vec2 = class extends ReadonlyVec2 {
  constructor(x = 0, y = 0) {
    super(x, y);
  }
  /**
   * Установка первой компоненты вектора (x)
   */
  setX(x) {
    this.vector[0] = x;
    return this;
  }
  /**
   * Установка второй компоненты вектора (y)
   */
  setY(y) {
    this.vector[1] = y;
    return this;
  }
  /**
   * Возвращает вектор с заданной длинной
   * При нормализации вектор сохраняет то же направление, но его длина равна newMagnitude
   * @see https://docs.unity3d.com/ru/530/ScriptReference/Vector2-normalized.html
   */
  normalize(newMagnitude = 1) {
    const { magnitude } = this;
    if (magnitude > 0) {
      return this.multiplyByScalar(newMagnitude / magnitude);
    }
    return this;
  }
  /**
   * Вычитает из текущего вектора переданный вектор
   */
  subtract(subtrahend) {
    return this.setX(this.x - subtrahend.x).setY(this.y - subtrahend.y);
  }
  /**
   * Умножает вектор на переданный вектор
   */
  mul(vector) {
    return this.setX(this.x * vector.x).setY(this.y * vector.y);
  }
  /**
   * Складывет вектор с переданным вектором
   */
  add(vector) {
    return this.setX(this.x + vector.x).setY(this.y + vector.y);
  }
  /**
   * Скалярное произведение
   * @see https://en.wikipedia.org/wiki/Dot_product
   */
  dotProduct(factor) {
    return this.x * factor.x + this.y * factor.y;
  }
  /**
   * Умножает вектор на скаляр
   */
  multiplyByScalar(scalar) {
    return this.setX(this.x * scalar).setY(this.y * scalar);
  }
  /**
   * Делит вектор на скаляр
   */
  divideByScalar(scalar) {
    return this.setX(this.x / scalar).setY(this.y / scalar);
  }
  /**
   * Cоздает копию вектора
   */
  clone() {
    return Vec2.create(this.x, this.y);
  }
  /**
   * Создает новый вектор
   */
  static create(x = 0, y = 0) {
    return new Vec2(x, y);
  }
  /**
   * Создает новый вектор из ReadonlyVec2
   * @see ReadonlyVec2
   */
  static fromReadonlyVec2(vector) {
    return Vec2.create(vector.x, vector.y);
  }
};

// src/engine/Box.ts
var Box = class {
  /**
   * Левая верхняя точка
   */
  min = Vec2.create();
  /**
  * Правая нижняя точка
  */
  max = Vec2.create();
  get x() {
    return this.min.x;
  }
  get y() {
    return this.min.y;
  }
  get width() {
    return this.max.x - this.min.x;
  }
  get height() {
    return this.max.y - this.min.y;
  }
  setX(x) {
    const { width } = this;
    this.min.setX(x);
    this.max.setX(x + width);
    return this;
  }
  setY(y) {
    const { height } = this;
    this.min.setY(y);
    this.max.setY(y + height);
    return this;
  }
  setWidth(width) {
    this.max.setX(this.min.x + width);
    return this;
  }
  setHeight(height) {
    this.max.setY(this.min.y + height);
    return this;
  }
  get center() {
    return ReadonlyVec2.fromVec2(
      this.max.clone().subtract(this.min).divideByScalar(2).add(this.min)
    );
  }
};

// src/engine/GameTail.ts
var GameTail = class extends Box {
  fill = void 0;
  image = void 0;
  isFixedPosition = false;
  ctx;
  parent = null;
  child = [];
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
    this.setWidth(width).setHeight(height);
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
var GameCanvas2d = class extends Box {
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
  setWidth(width) {
    super.setWidth(width);
    this.canvas.width = width;
    return this;
  }
  setHeight(height) {
    super.setHeight(height);
    this.canvas.height = height;
    return this;
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
    const vector = ReadonlyVec2.fromVec2(
      Vec2.create(x, y).normalize()
    );
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
  // /**
  //  * Определение пересечений по теореме о разделяющей оси
  //  * @see https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
  //  */
  // public checkCollided(newX: number, newY: number, second: GameCollider): boolean {
  //   const firstAABB = {
  //     min: Vec2.create(newX, newY),
  //     max: Vec2.create(newX + this.width, newY + this.height)
  //   }
  //   const secondAABB = second.axisAlignedBoundingBox
  //   const isCollided = !(
  //     // x
  //     (firstAABB.max.x < secondAABB.min.x || firstAABB.min.x > secondAABB.max.x)
  //     // y
  //     || (firstAABB.max.y < secondAABB.min.y || firstAABB.min.y > secondAABB.max.y)
  //   )
  //   return isCollided
  // }
  updatePosition() {
    let newX = this.x;
    let newY = this.y;
    const speedPerFrame = this.ctx.frameDuration / 1e3;
    newX = this.x + this.velocity.x * speedPerFrame;
    newY = this.y + this.velocity.y * speedPerFrame;
    this.setX(newX).setY(newY).checkCollision();
  }
  checkCollision() {
    this.collided = false;
    for (const collider of this.ctx.colliders) {
      if (collider === this) {
        continue;
      }
      const d = Vec2.fromReadonlyVec2(this.center).subtract(collider.center);
      const intersectionWidth = (this.width + collider.width) / 2 - Math.abs(d.x);
      const intersectionHeight = (this.height + collider.height) / 2 - Math.abs(d.y);
      if (intersectionWidth > 0 && intersectionHeight > 0) {
        this.collided = true;
        const overlapX = intersectionWidth * Math.sign(d.x);
        const overlapY = intersectionHeight * Math.sign(d.y);
        if (Math.abs(overlapX) < Math.abs(overlapY)) {
          this.setX(this.x + overlapX);
        } else {
          this.setY(this.y + overlapY);
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
        tail.setX(x * this.gridSize).setY(y * this.gridSize).setWidth(this.gridSize).setHeight(this.gridSize);
        this.addChild(tail);
        if (tail instanceof GameFloor) {
          this.floors.push(tail);
        } else if (tail instanceof GameWall) {
          this.walls.push(tail);
        }
      });
    });
    this.setWidth(maxX * this.gridSize).setHeight(maxY * this.gridSize);
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
};

// src/engine/gameObject/GamePlayer.ts
var GamePlayer = class extends GameUnit {
  image = document.createElement("img");
  playerState = 0 /* idle */;
  constructor() {
    super();
    this.image.src = "./sprite0.png";
    this.setWidth(50).setHeight(50);
  }
  update(ctx) {
    const speedPerSecond = 400;
    this.velocity = Vec2.fromReadonlyVec2(ctx.keyboard.vector).normalize(speedPerSecond);
    this.fill = { style: `hsl(300, 100%, 31%)` };
    this.updatePosition();
    console.log(this.center.x);
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
  gameTween = new GameTween();
  isFixedPosition = true;
  update(ctx) {
    super.update(ctx);
    const { width, height } = ctx.canvas.getScreenSize();
    this.setWidth(width).setHeight(height);
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
    this.setWidth(50).setHeight(50);
  }
  update(ctx) {
    const { parent } = this;
    this.image.src = `./sprite${Math.ceil(ctx.time / 1e3) % 3}.png`;
    assert(parent);
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
  [new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameWall(), new GameWall(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameFloor(), new GameWall()],
  [new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall(), new GameWall()]
]);
var demoBot = new DemoBot();
var demoBot2 = new DemoBot();
var demoBot3 = new DemoBot();
var demoBot4 = new DemoBot();
var demoBot5 = new DemoBot();
var demoBot6 = new DemoBot();
var player = new GamePlayer();
map.addUnit(demoBot.setX(100).setY(100));
map.addUnit(demoBot2.setX(100).setY(100));
map.addUnit(demoBot3.setX(100).setY(100));
map.addUnit(demoBot4.setX(100).setY(100));
map.addUnit(demoBot5.setX(100).setY(100));
map.addUnit(demoBot6.setX(100).setY(100));
map.addUnit(player.setX(100).setY(80));
gameLoop.addTiles(bgTail, map);
gameLoop.onFrameHandler = (ctx) => {
  const cameraPosition = Vec2.create(
    Math.sin(ctx.time / 1e3) * 10,
    Math.cos(ctx.time / 1e3) * 10
  ).add(player.center).subtract(ctx.canvas.center);
  ctx.camera.setX(cameraPosition.x).setY(cameraPosition.y);
};
var canvasEl = gameLoop.ctx.canvas.getElement();
document.body.appendChild(canvasEl);
var resizeObserver = new ResizeObserver(([{ contentRect: { width, height } }]) => {
  gameLoop.ctx.canvas.setWidth(width).setHeight(height);
});
resizeObserver.observe(canvasEl);
canvasEl.style.position = "absolute";
canvasEl.style.left = "0";
canvasEl.style.top = "0";
canvasEl.style.width = "100%";
canvasEl.style.height = "100%";
gameLoop.start();
