import "phaser";
import Background from "./objects/Background";
import Ground from "./objects/Ground";
import Player from "./objects/Player";
import ObstacleSpawner from "./objects/ObstacleSpawner";

export default class GameManager extends Phaser.GameObjects.GameObject {
  private background: Background = new Background(this.scene);
  private ground: Ground = new Ground(this.scene);
  private player: Player = new Player(this.scene);
  private obstacleSpawner: ObstacleSpawner = new ObstacleSpawner(this.scene);

  public score: number;
  public running: boolean = false;
  public onUpdateScore: (newScore: number) => void;
  public onGameOver: () => void;

  private currentScrollSpeed: number = 0;
  private targetScrollSpeed: number = 0;

  preload() {
    this.scene.load.audio("point", [
      "./assets/audio/point.ogg",
      "./assets/audio/point.wav",
    ]);

    this.background.preload();
    this.ground.preload();
    this.player.preload();
    this.obstacleSpawner.preload();

    this.obstacleSpawner.onHitObstacle = () => this.gameOver();
  }

  create() {
    this.background.create();
    this.player.create();
    this.ground.create();
  }

  update() {
    this.currentScrollSpeed +=
      (this.targetScrollSpeed - this.currentScrollSpeed) * 0.1;

    this.ground.update(this.currentScrollSpeed);
    this.obstacleSpawner.update(this.currentScrollSpeed);

    if (this.running) {
      this.player.update();

      let passed = false;
      for (const obstacle of this.obstacleSpawner.obstacles) {
        if (!obstacle.passed && obstacle.x < this.player.sprite.x) {
          obstacle.passed = true;
          passed = true;
        }
      }

      if (passed) {
        this.scene.sound.play("point");
        this.onUpdateScore(this.score + 1);
      }

      if (this.player.sprite.y >= this.ground.y - 32) {
        this.gameOver();
        this.player.sprite.setY(this.ground.y - 32);
      }
    }
  }

  gameOver() {
    this.player.die();
    this.onGameOver();
  }

  start() {
    this.running = true;
    this.player.reset();
    this.player.sprite.body.setAllowGravity(true);
    this.obstacleSpawner.start(this.ground, this.player);
    this.targetScrollSpeed = 2;
  }

  pause() {
    this.running = false;
    this.player.sprite.body.setAllowGravity(false);
    this.player.sprite.body.setVelocity(0, 0);
    this.targetScrollSpeed = 0;
  }
}
