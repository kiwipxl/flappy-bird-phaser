import "phaser";

export default class Player {
  private scene: Phaser.Scene;
  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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
    this.sprite = this.scene.physics.add.sprite(0, 0, "bird");
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
    this.sprite.setCircle(16);
    this.sprite.setOrigin(0, 0);
    this.sprite.setBounce(0.5);

    this.scene.input.on("pointerdown", () => {
      this.sprite.setVelocityY(-420);
    });

    this.reset();
  }

  reset() {
    this.sprite.setPosition(150, 200);
  }
}
