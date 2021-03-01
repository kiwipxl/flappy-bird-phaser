import "phaser";

export default class GameOverUI extends Phaser.GameObjects.GameObject {
  private scoreText: Phaser.GameObjects.BitmapText;

  constructor(scene: Phaser.Scene, score: number) {
    super(scene, "GameOverUI");

    this.scoreText = this.scene.add.bitmapText(
      200,
      50,
      "flappy-bird-font",
      score.toString(),
      64
    );
    this.scoreText.setDepth(150);
    this.scoreText.setOrigin(0.5, 0);
  }

  update() {}
}
