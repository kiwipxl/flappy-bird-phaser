import "phaser";

export default class GameScene extends Phaser.Scene {
  private player: Phaser.GameObjects.Sprite;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bird", "./assets/sprites/bluebird-downflap.png");
  }

  create() {
    this.player = this.add.sprite(200, 200, "bird");
    const group = this.physics.add.group(this.player);

    this.input.on("pointerdown", (pointer) => {
      group.setVelocityY(-420);
    });
  }

  update() {}
}
