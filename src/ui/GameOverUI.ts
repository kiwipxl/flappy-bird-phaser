import "phaser";

export default class GameOverUI extends Phaser.GameObjects.GameObject {
  private scoreText: Phaser.GameObjects.BitmapText;
  private title: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, score: number) {
    super(scene, "GameOverUI");

    this.scoreText = this.scene.add.bitmapText(
      200,
      100,
      "flappy-bird-font",
      score.toString(),
      64
    );
    this.scoreText.setOrigin(0.5, 0.5);
    this.scoreText.setScale(1.5, 1.5);
    this.scoreText.setTint(0xfca048);
    this.scoreText.setDepth(150);

    this.title = scene.add.image(200, 200, "gameover-title");
    this.title.setOrigin(0.5, 0.5);
    this.title.setScale(1.5, 1.5);
    this.title.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.title.setDepth(200);
  }

  update() {}

  destroy() {
    this.scene.children.remove(this.scoreText);
    this.scene.children.remove(this.title);
  }
}
