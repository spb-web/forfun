// src/engine/GameScene.ts
var GameScene = class {
  id;
  ctx;
  camera;
  colliders = [];
  onFrameHandler = () => {
  };
  player;
  tails = [];
  constructor(id) {
    this.id = id;
  }
  setContext(ctx) {
    this.ctx = ctx;
    this.tails.forEach((tail) => this.bindScene(tail));
    this.bindScene(this.camera);
    console.log(this.tails);
  }
  setCamera(camera3) {
    this.bindScene(camera3);
    this.camera = camera3;
  }
  addTiles(...tails) {
    tails.forEach((tail) => this.bindScene(tail));
    this.tails.push(...tails);
  }
  setPayer(player3) {
    this.player = player3;
  }
  onFrame() {
    this.camera.onFrame();
    this.tails.forEach((tail) => tail.onFrame());
    this.onFrameHandler(this.ctx);
    this.draw();
  }
  draw() {
    this.tails.forEach((tail) => tail.draw());
    this.camera.draw();
  }
  bindScene(tail) {
    if (this.ctx) {
      tail.setScene(this);
      tail.child.forEach((children) => this.bindScene(children));
    }
  }
};

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
  static create() {
    return new Box();
  }
  static from(entity) {
    return Box.create().setHeight(entity.height).setWidth(entity.width).setX(entity.x).setY(entity.y);
  }
};

// src/engine/GameTail.ts
var GameTail = class extends Box {
  fill = void 0;
  image = void 0;
  isFixedPosition = false;
  scene;
  parent = null;
  child = [];
  setScene(scene) {
    this.scene = scene;
    console.log(this, this.init);
    this.init();
  }
  init() {
  }
  setParent(tail) {
    this.parent = tail;
  }
  addChild(...child) {
    child.forEach((tail) => tail.setParent(this));
    return this.child.push(...child);
  }
  onFrame() {
    this.update();
    this.child.forEach((tail) => tail.onFrame());
  }
  update() {
  }
  draw(parentX = 0, parentY = 0) {
    const { scene: { camera: camera3, ctx } } = this;
    if (!camera3.checkCollided(Box.from(this).setX(this.x + parentX).setY(this.y + parentY))) {
      return;
    }
    let x = this.x + parentX;
    let y = this.y + parentY;
    if (!this.isFixedPosition) {
      x -= camera3.x;
      y -= camera3.y;
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
  static create() {
    return new GameTail();
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
  update() {
    const { width, height } = this.scene.ctx.canvas.getScreenSize();
    this.setWidth(width).setHeight(height);
  }
  static create() {
    return new GameCamera();
  }
};

// src/engine/helpers/assertReturn.ts
var assertReturn = (v, message = "value is nil") => {
  if (!v) {
    throw new Error(message);
  }
  return v;
};

// src/demo/scenes/cityParallaxScene/CityParallaxBackground.ts
var CityParallaxBackground = class extends GameTail {
  parallaxLayers = [];
  offsets = [];
  isFixedPosition = false;
  init() {
    for (let index = 1; index <= 6; index++) {
      this.scene.ctx.resources.add(`demo-city-parallax-${index}`, `./assets/demo/cityParallax/${index}.png`);
      const layer = GameTail.create();
      layer.image = assertReturn(this.scene.ctx.resources.images.get(`demo-city-parallax-${index}`));
      layer.image.repeatPattern = "repeat-x";
      this.parallaxLayers.push(layer);
      this.offsets.push(0);
      this.addChild(layer);
    }
  }
  update() {
    this.parallaxLayers.forEach((layer, index) => {
      this.offsets[index] += this.scene.ctx.frameDuration / 1e3 * (index + 1) * 20;
      if (this.offsets[index] >= layer.image.width) {
        console.log();
        this.offsets[index] = 0;
      }
      layer.image.transform.e = this.offsets[index];
      layer.setWidth(this.scene.ctx.canvas.width).setHeight(this.scene.ctx.canvas.height);
      layer.image.scale = [this.scene.ctx.canvas.width / layer.image.width, this.scene.ctx.canvas.width / layer.image.width];
    });
  }
};

// src/demo/scenes/cityParallaxScene/cityParallaxScene.ts
var cityParallaxScene = new GameScene("demo-city-parallax-screen");
var background = new CityParallaxBackground();
var camera = new GameCamera();
cityParallaxScene.addTiles(background);
cityParallaxScene.setCamera(camera);

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
  repeatPattern = "no-repeat";
  spriteRegion = Box.create();
  scale = [1, 1];
  transform = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  get width() {
    return this.data?.width ?? 0;
  }
  get height() {
    return this.data?.height ?? 0;
  }
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
var GameCanvas2d = class extends Box {
  canvas = document.createElement("canvas");
  ctx2d = assertReturn(
    this.canvas.getContext("2d"),
    "can not create 2d context"
  );
  constructor() {
    super();
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
          if (image.repeatPattern !== "no-repeat") {
            this.ctx2d.scale(image.scale[0], image.scale[1]);
            const pattern = assertReturn(this.ctx2d.createPattern(image.data, image.repeatPattern));
            pattern.setTransform(image.transform);
            this.ctx2d.fillStyle = pattern;
            this.ctx2d.imageSmoothingEnabled = false;
            this.ctx2d.fillRect(x, y, width, height);
            this.ctx2d.scale(1 / image.scale[0], 1 / image.scale[1]);
          } else {
            this.ctx2d.imageSmoothingEnabled = false;
            this.ctx2d.drawImage(image.data, x, y, width, height);
          }
        }
      } else {
        this.ctx2d.imageSmoothingEnabled = false;
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
  constructor(loop) {
    this.loop = loop;
  }
  onFrame() {
    const time = Date.now();
    this.frame.duration = time - this.frame.time;
    this.frame.time = time;
  }
};

// src/engine/GameLoop.ts
var GameLoop = class {
  scenes = /* @__PURE__ */ new Map();
  activeSceneId = "default";
  ctx;
  onFrameHandler = () => {
  };
  isStarted = false;
  constructor() {
    this.ctx = new GameContext(this);
  }
  get activeScene() {
    return this.scenes.get(this.activeSceneId);
  }
  addScenes(...scenes) {
    scenes.forEach((scene) => {
      scene.setContext(this.ctx);
      this.scenes.set(scene.id, scene);
    });
  }
  setActiveScenes(id) {
    this.activeSceneId = id;
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
    const { activeScene } = this;
    this.ctx.onFrame();
    if (activeScene) {
      this.ctx.canvas.clear();
      activeScene.onFrame();
    }
    this.onFrameHandler(this.ctx);
    if (this.ctx.frameDuration > 34) {
      console.warn("onFrame executing is too long");
    }
    requestAnimationFrame(() => {
      this.onFrame();
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
  init() {
    this.scene.colliders.push(this);
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
    const { scene: { ctx } } = this;
    let newX = this.x;
    let newY = this.y;
    const speedPerFrame = ctx.frameDuration / 1e3;
    newX = this.x + this.velocity.x * speedPerFrame;
    newY = this.y + this.velocity.y * speedPerFrame;
    this.setX(newX).setY(newY).checkCollision();
  }
  checkCollision() {
    this.collided = false;
    for (const collider of this.scene.colliders) {
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
  constructor(map3 = []) {
    super();
    this.map = map3;
    let maxX = 0;
    let maxY = map3.length;
    map3.forEach((row, x) => {
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
    this.drawChild();
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
    super.init();
    const { scene: { ctx } } = this;
    ctx.resources.add("floor", "./floor.jpg");
    this.image = ctx.resources.images.get("floor");
  }
};

// src/game/Wall.ts
var Wall = class extends GameWall {
  init() {
    super.init();
    const { scene: { ctx } } = this;
    ctx.resources.add("wall", "./wall.jpg");
    this.image = ctx.resources.images.get("wall");
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
  update() {
    const { scene: { ctx } } = this;
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
    super.init();
    const { ctx } = this.scene;
    ctx.resources.add("car", "./car.png");
    this.car.image = ctx.resources.images.get("car");
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
  constructor() {
    super();
    this.setWidth(32).setHeight(32);
  }
  init() {
    super.init();
    const { ctx } = this.scene;
    ctx.resources.add("bot-character-0", "./sprite0.png");
    ctx.resources.add("bot-character-1", "./sprite1.png");
    ctx.resources.add("bot-character-2", "./sprite2.png");
    this.image = ctx.resources.images.get("player-character");
  }
  update() {
    const { parent, scene: { ctx } } = this;
    this.image = ctx.resources.images.get(`bot-character-${Math.ceil(ctx.time / 1e3) % 3}`);
    assert(parent);
    this.updatePosition();
    if (this.collided) {
      this.velocity = Vec2.create(Math.random() * 1600 - 800, Math.random() * 1600 - 800);
    }
  }
};

// src/engine/gameObject/GamePlayer.ts
var GamePlayer = class extends GameUnit {
  playerState = 0 /* idle */;
  constructor() {
    super();
    this.setWidth(50).setHeight(50);
  }
  update() {
    const speedPerSecond = 400;
    this.velocity = Vec2.fromReadonlyVec2(this.scene.ctx.keyboard.vector).normalize(speedPerSecond);
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
    super.init();
    const { scene: { ctx } } = this;
    ctx.resources.add("player-character", "./sprite0.png");
    this.character.image = ctx.resources.images.get("player-character");
    this.addChild(
      this.glow.setWidth(432).setHeight(432).setX(-216).setY(-216),
      this.character.setWidth(32).setHeight(32).setX(0).setY(0)
    );
    this.setWidth(32).setHeight(32);
  }
  update() {
    super.update();
    const { scene: { camera: camera3, ctx } } = this;
    const glowGradient = ctx.canvas.ctx2d.createRadialGradient(
      this.center.x - camera3.x,
      this.center.y - camera3.y,
      0,
      this.center.x - camera3.x,
      this.center.y - camera3.y,
      200
    );
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    glowGradient.addColorStop(1, "transparent");
    this.glow.fill = {
      style: glowGradient
    };
  }
};

// src/game/Door.ts
var Door = class extends GameFloor {
  sceneId;
  constructor(sceneId) {
    super();
    this.sceneId = sceneId;
  }
  update() {
    if (this.scene.player && this.checkCollided(this.scene.player)) {
      this.scene.ctx.loop.setActiveScenes(this.sceneId);
      this.scene.player.setX(100).setY(80);
    }
  }
  init() {
    super.init();
    const { scene: { ctx } } = this;
    ctx.resources.add("door", "./door.jpg");
    this.image = ctx.resources.images.get("door");
  }
};

// src/game/sceens/firstLevel.ts
var firstLevel = new GameScene("first-level");
var bgTail = new BgTail();
var map = new GameMap([
  [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()],
  [new Wall(), new Door("second-level"), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
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
firstLevel.addTiles(
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
  )
);
firstLevel.setPayer(player);
firstLevel.setCamera(GameCamera.create());
firstLevel.onFrameHandler = (ctx) => {
  const cameraPosition = Vec2.create(
    Math.sin(ctx.time / 1e3) * 10,
    Math.cos(ctx.time / 1e3) * 10
  ).add(player.center).subtract(ctx.canvas.center);
  firstLevel.camera.setX(cameraPosition.x).setY(cameraPosition.y);
};

// src/game/ProgressBarTail.ts
var ProgressBarTail = class extends GameTail {
  progress = 0;
  distract = 0;
  init() {
    super.init();
    this.setHeight(50);
  }
  update() {
    const { scene: { camera: camera3, ctx } } = this;
    const progress2 = ctx.resources.loaded / ctx.resources.total;
    const maxWidth = ctx.canvas.width;
    const minHeight = 50;
    const width = maxWidth * progress2;
    if (progress2 !== this.progress) {
      this.distract = 1;
    }
    this.distract = Math.max(0, this.distract - ctx.frameDuration / 1e3 * 3);
    this.fill = {
      style: `rgb(255, ${255 - this.distract * 255}, ${255 - this.distract * 255})`
    };
    const height = minHeight + 15 * this.distract;
    this.progress = progress2;
    this.setWidth(width).setHeight(height).setX((ctx.canvas.width - width) / 2 + camera3.x).setY((ctx.canvas.height - height) / 2 + camera3.y);
  }
};

// src/game/sceens/loadScreen.ts
var loadScreen = new GameScene("load-screen");
var progress = new ProgressBarTail();
var camera2 = new GameCamera();
loadScreen.addTiles(progress);
loadScreen.setCamera(camera2);

// src/game/BgDarkTail.ts
var BgDarkTail = class extends GameTail {
  gameTween = new GameTween();
  isFixedPosition = true;
  update() {
    const { scene: { ctx } } = this;
    const { width, height } = ctx.canvas.getScreenSize();
    this.setWidth(width).setHeight(height);
    this.fill = { style: `hsl(${this.gameTween.calc(ctx.time)}, 100%, 10%)` };
  }
};

// src/game/sceens/secondLevel.ts
var secondLevel = new GameScene("second-level");
var bgTail2 = new BgDarkTail();
var map2 = new GameMap([
  [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()],
  [new Wall(), new Door("first-level"), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Wall(), new Wall(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Floor(), new Wall()],
  [new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall(), new Wall()]
]);
var player2 = new Player();
secondLevel.addTiles(
  bgTail2,
  map2.addUnits(
    player2.setX(100).setY(80)
  )
);
secondLevel.setPayer(player2);
secondLevel.setCamera(GameCamera.create());
secondLevel.onFrameHandler = (ctx) => {
  const cameraPosition = Vec2.create(
    Math.sin(ctx.time / 1e3) * 50,
    Math.cos(ctx.time / 1e3) * 10
  ).add(player2.center).subtract(ctx.canvas.center);
  secondLevel.camera.setX(cameraPosition.x).setY(cameraPosition.y);
};

// src/index.ts
var gameLoop = new GameLoop();
gameLoop.onFrameHandler = () => {
};
gameLoop.addScenes(firstLevel, secondLevel, loadScreen, cityParallaxScene);
gameLoop.setActiveScenes("load-screen");
gameLoop.start();
gameLoop.ctx.resources.load().then(() => {
  console.log("\u0440\u0435\u0441\u0443\u0440\u0441\u044B \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u044B");
  gameLoop.setActiveScenes("demo-city-parallax-screen");
  setTimeout(() => {
    gameLoop.setActiveScenes("first-level");
  }, 3e3);
}).catch(console.error);
var canvasEl = gameLoop.ctx.canvas.getElement();
document.body.appendChild(canvasEl);
var resizeObserver = new ResizeObserver(([{ contentRect: { width, height } }]) => {
  gameLoop.ctx.canvas.setWidth(width / 2).setHeight(height / 2);
});
resizeObserver.observe(canvasEl);
canvasEl.style.position = "absolute";
canvasEl.style.left = "0";
canvasEl.style.top = "0";
canvasEl.style.width = "100%";
canvasEl.style.height = "100%";
canvasEl.style.imageRendering = "pixelated";
