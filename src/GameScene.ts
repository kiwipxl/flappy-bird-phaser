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

  private static SCROLL_SPEED = 2;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.background.preload();
    this.ground.preload();
    this.player.preload();
    this.obstacleSpawner.preload();
  }

  create() {
    this.background.create();
    this.player.create();
    this.ground.create();
    this.obstacleSpawner.start(this.ground, this.player);
  }

  update() {
    this.ground.update(GameScene.SCROLL_SPEED);
    this.obstacleSpawner.update(GameScene.SCROLL_SPEED);
  }
}
