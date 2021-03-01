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

    this.scene.load.image("fire", "./assets/sprites/fire.png");

    this.scene.load.audio("die", [
      "./assets/audio/die.ogg",
      "./assets/audio/die.wav",
    ]);
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
      frameRate: 8,
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
    this.sprite.setVisible(true);
    this.sprite.setPosition(150, 300);
    this.sprite.play("flap");
  }

  die() {
    this.scene.sound.play("die");

    this.sprite.setVisible(false);

    const particles = this.scene.add.particles("fire");
    const emitter = particles.createEmitter({
      active: true,
      blendMode: 0,
      gravityX: 0,
      gravityY: 1000,
      on: true,
      particleBringToTop: true,
      radial: true,
      visible: true,
      angle: { min: 90, max: 360 },
      alpha: { start: 1, end: 0, ease: "Linear" },
      lifespan: { min: 100, max: 600 },
      quantity: 25,
      tint: 0xff0000,
      speed: { min: 50, max: 500 },
      scale: { start: 0.4, end: 0, ease: "Linear" },
    });
    particles.setDepth(200);
    emitter.explode(100, this.sprite.x, this.sprite.y);
  }
}
