import "phaser";

export default class PipeObstacle extends Phaser.GameObjects.Sprite {
  public collider: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  public static DEPTH: number = 50;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "pipe-green");

    this.setOrigin(0, 0);
    this.setDepth(PipeObstacle.DEPTH);

    this.collider = scene.physics.add.sprite(x, y, "pipe-green");
    this.collider.setOrigin(0, 0);
    this.collider.setVisible(false);
    this.collider.body.setAllowGravity(false);
  }

  update() {
    if (this.scaleY < 0) {
      this.collider.setPosition(this.x, this.y - this.height, this.z);
    } else {
      this.collider.setPosition(this.x, this.y, this.z);
    }
  }
}
