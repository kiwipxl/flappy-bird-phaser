import "phaser";

export default class Player {
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
