import "phaser";

function getTextureSize(texture: Phaser.Textures.Texture): Phaser.Structs.Size {
  return new Phaser.Structs.Size(
    texture.source[0].width,
    texture.source[0].height
  );
}

class GroundSpawner {
  create(scene: Phaser.Scene) {
    const texture = scene.textures.get("ground");
    texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    const size = getTextureSize(texture);

    const scale = size.height / (scene.game.scale.height * 0.2);
    const numImages = Math.ceil(scene.game.scale.width / (size.width * scale));

    for (let n = 0; n < numImages; ++n) {
      const x = size.width * n * scale;
      const y = scene.game.scale.height - size.height * scale;

      let bg = scene.add.image(x, y, texture);
      bg.setScale(scale, scale);
      bg.setOrigin(0, 0);
      bg.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
  }

  clear() {}
}

export default class GameScene extends Phaser.Scene {
  private player: Phaser.GameObjects.Sprite;
  private groundSpawner: GroundSpawner = new GroundSpawner();

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bird", "./assets/sprites/bluebird-downflap.png");
    this.load.image("background-day", "./assets/sprites/background-day.png");
    this.load.image("ground", "./assets/sprites/base.png");
  }

  createBackground() {
    const texture = this.textures.get("background-day");
    texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    const size = getTextureSize(texture);

    const scale = this.game.scale.height / size.height;
    const numImages = Math.ceil(this.game.scale.width / (size.width * scale));

    for (let n = 0; n < numImages; ++n) {
      const x = size.width * n * scale;

      let bg = this.add.image(x, 0, texture);
      bg.setScale(scale, scale);
      bg.setOrigin(0, 0);
    }
  }

  create() {
    this.createBackground();

    this.groundSpawner.create(this);

    this.player = this.add.sprite(200, 200, "bird");
    this.player.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    const group = this.physics.add.group(this.player);

    this.input.on("pointerdown", () => {
      group.setVelocityY(-420);
    });
  }

  update() {}
}
