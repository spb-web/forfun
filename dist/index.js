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
  checkCollided(box) {
    const isCollided = !// x
    (this.max.x < box.min.x || this.min.x > box.max.x || (this.max.y < box.min.y || this.min.y > box.max.y));
    return isCollided;
  }
  get center() {
    return ReadonlyVec2.fromVec2(
      this.max.clone().subtract(this.min).divideByScalar(2).add(this.min)
    );
  }
  static from(entity) {
    const box = new Box();
    box.setHeight(entity.height).setWidth(entity.width).setX(entity.x).setY(entity.y);
    return box;
  }
};

// src/engine/resources/GameResource.ts
var GameResource = class {
  resource;
  data = null;
  id;
  isLoaded = false;
  constructor(id, resource) {
    this.id = id;
    this.resource = resource;
  }
  async load() {
    if (this.isLoaded) {
      return;
    }
    this.data = await this.loadResource();
    this.isLoaded = true;
  }
  loadResource() {
    return Promise.resolve(this.data);
  }
};

// src/engine/resources/GameResourceImage.ts
var GameResourceImage = class extends GameResource {
  loadResource() {
    return new Promise((resolve, reject) => {
      const image = document.createElement("img");
      const handleLoaded = () => {
        image.removeEventListener("load", handleLoaded);
        resolve(image);
      };
      const handleError = (error) => {
        image.removeEventListener("error", handleError);
        reject(error);
      };
      image.addEventListener("load", handleLoaded);
      image.addEventListener("error", handleError);
      image.src = this.resource;
    });
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
  ctx2d = assertReturn(
    this.canvas.getContext("2d", { alpha: false }),
    "can not create 2d context"
  );
  constructor() {
    super();
    this.ctx2d.imageSmoothingEnabled = false;
  }
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
      if (image instanceof GameResourceImage) {
        if (image.data) {
          this.ctx2d.drawImage(image.data, x, y, width, height);
        }
      } else {
        this.ctx2d.drawImage(image, x, y, width, height);
      }
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

// src/engine/resources/GameResources.ts
var GameResources = class {
  images = /* @__PURE__ */ new Map();
  loaded = 0;
  total = 0;
  add(id, resource) {
    if (this.images.has(id)) {
      return;
    } else {
      this.images.set(id, new GameResourceImage(id, resource));
      this.total += 1;
    }
  }
  load() {
    const promises = [];
    this.images.forEach((resource) => {
      promises.push(
        resource.load().then(() => {
          this.loaded += 1;
        })
      );
    });
    return Promise.all(promises);
  }
};

// src/engine/GameContext.ts
var GameContext = class {
  loop;
  keyboard = new GameKeyboard();
  canvas = new GameCanvas2d();
  resources = new GameResources();
  gameCamera;
  colliders = [];
  frame = {
    time: Date.now(),
    duration: 0
  };
  get camera() {
    if (!this.gameCamera) {
      throw new Error();
    }
    return this.gameCamera;
  }
  get time() {
    return this.frame.time;
  }
  get frameDuration() {
    return this.frame.duration;
  }
  constructor(loop) {
    this.loop = loop;
  }
  onFrame() {
    const time = Date.now();
    this.frame.duration = time - this.frame.time;
    this.frame.time = time;
  }
  setCamera(camera) {
    this.gameCamera = camera;
  }
};

// src/engine/GameLoop.ts
var GameLoop = class {
  ctx;
  onFrameHandler = () => {
  };
  isStarted = false;
  tails = [];
  constructor() {
    this.ctx = new GameContext(this);
  }
  setCamera(camera) {
    this.bindCtx(camera).ctx.setCamera(camera);
    return this;
  }
  addTiles(...tails) {
    tails.forEach((tail) => this.bindCtx(tail));
    this.tails.push(...tails);
    return this;
  }
  bindCtx(tail) {
    tail.setContext(this.ctx);
    tail.child.forEach((children) => this.bindCtx(children));
    return this;
  }
  start() {
    if (this.isStarted) {
      throw new Error("Already started");
    }
    this.isStarted = true;
    requestAnimationFrame(() => {
      this.onFrame();
    });
    return this;
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
      tail.draw();
    });
    this.ctx.camera.draw();
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
  init() {
  }
  setContext(ctx) {
    this.ctx = ctx;
    this.init();
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
  draw(parentX = 0, parentY = 0) {
    const { ctx } = this;
    if (!ctx.camera.checkCollided(Box.from(this).setX(this.x + parentX).setY(this.y + parentY))) {
      return;
    }
    let x = this.x + parentX;
    let y = this.y + parentY;
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
    this.drawChild(this.x, this.y);
  }
  drawChild(x, y) {
    this.child.forEach((tail) => {
      tail.draw(x, y);
    });
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
    super.setContext(ctx);
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
};

// src/engine/gameObject/GameFloor.ts
var GameFloor = class extends GameTail {
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
  addUnits(...units) {
    this.addChild(...units);
    this.units.push(...units);
    return this;
  }
  addWall(wall) {
    this.addChild(wall);
    this.walls.push(wall);
  }
  draw() {
    if (this.ctx.resources.loaded === this.ctx.resources.total) {
      this.drawChild();
    }
  }
  drawChild() {
    this.floors.forEach((tail) => tail.draw());
    this.units.forEach((tail) => tail.draw());
    this.walls.forEach((tail) => tail.draw());
  }
};

// src/game/Floor.ts
var Floor = class extends GameFloor {
  init() {
    this.ctx.resources.add("floor", "./floor.jpg");
    this.image = this.ctx.resources.images.get("floor");
  }
};

// src/game/Wall.ts
var Wall = class extends GameWall {
  init() {
    this.ctx.resources.add("wall", "./wall.jpg");
    this.image = this.ctx.resources.images.get("wall");
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

// src/game/Car.ts
var Car = class extends GameWall {
  car = new GameTail();
  constructor() {
    super();
    this.setWidth(95).setHeight(230).addChild(
      this.car.setWidth(135).setHeight(230).setX(-20)
    );
  }
  init() {
    this.ctx.resources.add("car", "./car.png");
    this.car.image = this.ctx.resources.images.get("car");
  }
};

// src/engine/gameObject/GameUnit.ts
var GameUnit = class extends GameCollider {
};

// src/game/DemoBot.ts
function assert(v) {
  if (!v) {
    throw new Error("value is nil");
  }
}
var DemoBot = class extends GameUnit {
  velocity = Vec2.create(Math.random() * 1600 - 800, Math.random() * 1600 - 800);
  fill = void 0;
  constructor() {
    super();
    this.setWidth(50).setHeight(50);
  }
  init() {
    this.ctx.resources.add("bot-character-0", "./sprite0.png");
    this.ctx.resources.add("bot-character-1", "./sprite1.png");
    this.ctx.resources.add("bot-character-2", "./sprite2.png");
    this.image = this.ctx.resources.images.get("player-character");
  }
  update(ctx) {
    const { parent } = this;
    this.image = this.ctx.resources.images.get(`bot-character-${Math.ceil(ctx.time / 1e3) % 3}`);
    assert(parent);
    this.updatePosition();
    if (this.collided) {
      this.velocity = Vec2.create(Math.random() * 1600 - 800, Math.random() * 1600 - 800);
    }
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
  static create() {
    return new GameCamera();
  }
};

// src/engine/gameObject/GamePlayer.ts
var GamePlayer = class extends GameUnit {
  playerState = 0 /* idle */;
  constructor() {
    super();
    this.setWidth(50).setHeight(50);
  }
  update(ctx) {
    const speedPerSecond = 400;
    this.velocity = Vec2.fromReadonlyVec2(ctx.keyboard.vector).normalize(speedPerSecond);
    this.updatePosition();
  }
};

// src/game/Player.ts
var Player = class extends GamePlayer {
  /** Тайл с эффектом свечения */
  glow = new GameTail();
  /** Тайл с текстурой игрока */
  character = new GameTail();
  init() {
    this.ctx.resources.add("player-character", "./sprite0.png");
    this.character.image = this.ctx.resources.images.get("player-character");
    this.addChild(
      this.glow.setWidth(450).setHeight(450).setX(-225).setY(-225),
      this.character.setWidth(50).setHeight(50).setX(0).setY(0)
    );
  }
  update(ctx) {
    super.update(ctx);
    const glowGradient = ctx.canvas.ctx2d.createRadialGradient(
      this.center.x - ctx.camera.x,
      this.center.y - ctx.camera.y,
      0,
      this.center.x - ctx.camera.x,
      this.center.y - ctx.camera.y,
      200
    );
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    glowGradient.addColorStop(1, "transparent");
    this.glow.fill = {
      style: glowGradient
    };
  }
};

// src/game/LoadScreen.ts
var LoadScreen = class extends GameTail {
  progress = 0;
  distract = 0;
  init() {
    this.setHeight(50);
  }
  update() {
    const progress = this.ctx.resources.loaded / this.ctx.resources.total;
    if (progress === 1) {
      this.fill = void 0;
      return;
    }
    const maxWidth = this.ctx.canvas.width;
    const minHeight = 50;
    const width = maxWidth * progress;
    if (progress !== this.progress) {
      this.distract = 1;
    }
    this.distract = Math.max(0, this.distract - this.ctx.frameDuration / 1e3 * 3);
    this.fill = {
      style: `rgb(255, ${255 - this.distract * 255}, ${255 - this.distract * 255})`
    };
    const height = minHeight + 15 * this.distract;
    this.progress = progress;
    this.setWidth(width).setHeight(height).setX((this.ctx.canvas.width - width) / 2 + this.ctx.camera.x).setY((this.ctx.camera.height - height) / 2 + this.ctx.camera.y);
  }
};

// src/index.ts
var gameLoop = new GameLoop();
var loadScreen = new LoadScreen();
var bgTail = new BgTail();
var map = new GameMap([
  [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()]
]);
var demoBot = new DemoBot();
var demoBot2 = new DemoBot();
var demoBot3 = new DemoBot();
var demoBot4 = new DemoBot();
var demoBot5 = new DemoBot();
var demoBot6 = new DemoBot();
var player = new Player();
var car = new Car();
gameLoop.addTiles(
  bgTail,
  map.addUnits(
    demoBot.setX(100).setY(100),
    demoBot2.setX(100).setY(100),
    demoBot3.setX(100).setY(100),
    demoBot4.setX(100).setY(100),
    demoBot5.setX(100).setY(100),
    demoBot6.setX(100).setY(100),
    player.setX(100).setY(80),
    car.setX(650).setY(80)
  ),
  loadScreen
).setCamera(GameCamera.create()).onFrameHandler = (ctx) => {
  const cameraPosition = Vec2.create(
    Math.sin(ctx.time / 1e3) * 10,
    Math.cos(ctx.time / 1e3) * 10
  ).add(player.center).subtract(ctx.canvas.center);
  ctx.camera.setX(cameraPosition.x).setY(cameraPosition.y);
};
gameLoop.start();
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
gameLoop.ctx.resources.load().then(() => {
  console.log("\u0440\u0435\u0441\u0443\u0440\u0441\u044B \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B");
}).catch(console.error);
