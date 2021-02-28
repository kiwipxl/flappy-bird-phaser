import "phaser";

export let gameScene;

function getTextureSize(texture: Phaser.Textures.Texture): Phaser.Structs.Size {
  return new Phaser.Structs.Size(
    texture.source[0].width,
    texture.source[0].height
  );
}

class BackgroundSpawner {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image("ground", "./assets/sprites/base.png");
    this.scene.load.image(
      "background-day",
      "./assets/sprites/background-day.png"
    );
  }

  create() {
    this.createBackground();
    this.createGround();
  }

  createBackground() {
    const texture = this.scene.textures.get("background-day");
    texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    const size = getTextureSize(texture);

    const scale = this.scene.game.scale.height / size.height;
    const numImages = Math.ceil(
      this.scene.game.scale.width / (size.width * scale)
    );

    for (let n = 0; n < numImages; ++n) {
      const x = size.width * n * scale;

      let bg = this.scene.add.image(x, 0, texture);
      bg.setScale(scale, scale);
      bg.setOrigin(0, 0);
    }
  }

  createGround() {
    const texture = this.scene.textures.get("ground");
    texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    const size = getTextureSize(texture);

    const scale = size.height / (this.scene.game.scale.height * 0.2);
    const numImages = Math.ceil(
      this.scene.game.scale.width / (size.width * scale)
    );

    for (let n = 0; n < numImages; ++n) {
      const x = size.width * n * scale;
      const y = this.scene.game.scale.height - size.height * scale;

      let bg = this.scene.add.image(x, y, texture);
      bg.setScale(scale, scale);
      bg.setOrigin(0, 0);
      bg.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
  }
}

class Player {
  private sprite: Phaser.GameObjects.Sprite;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image(
      "bird-flap1",
      "./assets/sprites/bluebird-downflap.png"
    );
    this.scene.load.image(
      "bird-flap2",
      "./assets/sprites/bluebird-midflap.png"
    );
    this.scene.load.image("bird-flap3", "./assets/sprites/bluebird-upflap.png");
  }

  create() {
    this.sprite = this.scene.add.sprite(200, 200, "bird");
    this.sprite.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

    this.scene.anims.create({
      key: "flap",
      frames: [
        { key: "bird-flap1" },
        { key: "bird-flap2" },
        { key: "bird-flap3" },
        { key: "bird-flap2" },
      ],
      frameRate: 6,
      repeat: -1,
    });

    this.sprite.play("flap");

    const group = this.scene.physics.add.group(this.sprite);

    this.scene.input.on("pointerdown", () => {
      group.setVelocityY(-420);
    });
  }
}

export default class GameScene extends Phaser.Scene {
  private bgSpawner: BackgroundSpawner = new BackgroundSpawner(this);
  private player: Player = new Player(this);

  constructor() {
    super("GameScene");
  }

  preload() {
    this.bgSpawner.preload();
    this.player.preload();
  }

  create() {
    this.bgSpawner.create();
    this.player.create();
  }

  update() {}
}
