import "phaser";

export default class GameOverUI extends Phaser.GameObjects.GameObject {
  private scoreText: Phaser.GameObjects.BitmapText;
  public score: number = 0;

  constructor(scene: Phaser.Scene) {
    super(scene, "GameOverUI");

    this.scoreText = this.scene.add.bitmapText(
      200,
      200,
      "flappy-bird-font",
      "0",
      64
    );
    this.scoreText.setDepth(150);
    this.scoreText.setOrigin(0.5, 0);
  }

  update() {
    this.scoreText.setText(this.score.toString());
  }
}
