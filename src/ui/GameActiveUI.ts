import "phaser";

export default class GameActiveUI extends Phaser.GameObjects.GameObject {
  private scoreText: Phaser.GameObjects.BitmapText;
  public score: number = 0;

  constructor(scene: Phaser.Scene) {
    super(scene, "GameActiveUI");

    this.scoreText = this.scene.add.bitmapText(
      200,
      100,
      "flappy-bird-font",
      "0",
      64
    );
    this.scoreText.setOrigin(0.5, 0.5);
    this.scoreText.setDepth(150);
  }

  update() {
    this.scoreText.setText(this.score.toString());
  }

  destroy() {
    this.scene.children.remove(this.scoreText);
  }
}
