import "phaser";
import { getTextureSize } from "./util";

export default class Ground {
  private scene: Phaser.Scene;
  private images: Phaser.GameObjects.Image[] = [];
  private scale: number;
  public y: number;
  public static DEPTH: number = 100;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image("ground", "./assets/sprites/base.png");
  }

  create(container: Phaser.GameObjects.Container) {
    // Create a bunch of ground images to begin with to fill the screen
    const texture = this.scene.textures.get("ground");
    texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    const size = getTextureSize(texture);

    this.scale = size.height / (this.scene.game.scale.height * 0.2);
    this.y = this.scene.game.scale.height - size.height * this.scale;

    for (let n = 0; n < 10; ++n) {
      this.createGround(size.width * n * this.scale, container);
    }
  }

  createGround(x: number, container: Phaser.GameObjects.Container) {
    // Create a single ground image
    const texture = this.scene.textures.get("ground");
    const size = getTextureSize(texture);

    let ground = this.scene.add.image(x, this.y, texture);
    ground.setScale(this.scale, this.scale);
    ground.setOrigin(0, 0);
    ground.setDepth(Ground.DEPTH);

    container.add(ground);
    this.images.push(ground);
  }

  update(container: Phaser.GameObjects.Container) {
    const firstGround = this.images[0];
    const lastGround = this.images[this.images.length - 1];

    if (firstGround.x + container.x < -firstGround.width * this.scale) {
      this.images.splice(0, 1);

      container.remove(firstGround);

      this.createGround(
        lastGround.x + firstGround.width * this.scale,
        container
      );
    }
  }
}
