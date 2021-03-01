import "phaser";

export default class PipeObstacle extends Phaser.GameObjects.Sprite {
  public collider: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public passed: boolean = false;

  public static DEPTH: number = 50;

  constructor(scene: Phaser.Scene, x: number, y: number, hardPipe: boolean) {
    // A hard pipe has a smaller gap. This is visually shown as a red pipe.
    super(scene, x, y, hardPipe ? "pipe-red" : "pipe-green");

    this.setOrigin(0, 0);
    this.setDepth(PipeObstacle.DEPTH);

    // Create the collider for the pipe.
    // We have to create a separate collider here instead of the class sprite, and that's
    // because we want to be able to scale our sprite, and the collider unfortunately doesn't scale with it.
    // It probably should, but it doesn't!
    this.collider = scene.physics.add.sprite(x, y, this.texture.key);
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
