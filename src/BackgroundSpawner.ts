import "phaser";
import { getTextureSize } from "./util";

export default class BackgroundSpawner {
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
