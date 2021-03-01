import "phaser";

export default class Player {
  private scene: Phaser.Scene;
  public sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private targetRotation: number = 0;

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

    this.sprite.setCircle(16);
    this.sprite.setOrigin(0.5, 0.5);

    this.scene.input.on("pointerdown", () => {
      this.sprite.setVelocityY(-420);
    });

    this.reset();
  }

  update() {
    this.updateRotation();
  }

  updateRotation() {
    const MIN_VEL_Y = -100;
    const MAX_VEL_Y = 300;
    const TURN_ANGLE = Math.PI * 0.5 * 0.5;
    const ROTATE_SPEED = 0.25;

    let velY = this.sprite.body.velocity.y;
    // clamp between min/max
    velY = Math.max(MIN_VEL_Y, Math.min(MAX_VEL_Y, velY));

    const t = (velY - MIN_VEL_Y) / (MAX_VEL_Y - MIN_VEL_Y);

    this.targetRotation = -TURN_ANGLE + TURN_ANGLE * 2 * t;

    // lerp to target rotation
    this.sprite.setRotation(
      this.sprite.rotation +
        (this.targetRotation - this.sprite.rotation) * ROTATE_SPEED
    );
  }

  reset() {
    this.sprite.setPosition(150, 200);
    this.sprite.play("flap");
  }
}
