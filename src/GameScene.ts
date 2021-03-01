import "phaser";
import Background from "./Background";
import Ground from "./Ground";
import Player from "./Player";
import ObstacleSpawner from "./ObstacleSpawner";

export default class GameScene extends Phaser.Scene {
  private background: Background = new Background(this);
  private ground: Ground = new Ground(this);
  private player: Player = new Player(this);
  private obstacleSpawner: ObstacleSpawner = new ObstacleSpawner(this);
  private scoreText: Phaser.GameObjects.BitmapText;
  private score: number = 0;

  private static SCROLL_SPEED = 2;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.background.preload();
    this.ground.preload();
    this.player.preload();
    this.obstacleSpawner.preload();

    this.load.bitmapFont(
      "flappy-bird-font",
      "./assets/fonts/flappy_bird_numbers_48px.png",
      "./assets/fonts/flappy_bird_numbers_48px.fnt"
    );
  }

  create() {
    this.background.create();
    this.player.create();
    this.ground.create();
    this.obstacleSpawner.start(this.ground, this.player);

    this.scoreText = this.add.bitmapText(200, 200, "flappy-bird-font", "0", 64);
    this.scoreText.setDepth(150);
    this.scoreText.setOrigin(0.5, 0);
  }

  update() {
    this.ground.update(GameScene.SCROLL_SPEED);
    this.obstacleSpawner.update(GameScene.SCROLL_SPEED);

    this.scoreText.setText(this.score.toString());
    console.log(this.score.toString());

    let passed = false;
    for (const obstacle of this.obstacleSpawner.obstacles) {
      if (!obstacle.passed && obstacle.x < this.player.sprite.x) {
        obstacle.passed = true;
        passed = true;
      }
    }

    if (passed) {
      this.score += 1;
    }
  }
}
