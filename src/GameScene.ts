import "phaser";
import Background from "./Background";
import Ground from "./Ground";
import Player from "./Player";
import ObstacleSpawner from "./ObstacleSpawner";

export default class GameScene extends Phaser.Scene {
  private background: Background = new Background(this);
  private ground: Ground = new Ground(this);
  private player: Player = new Player(this);
  private movingContainer: Phaser.GameObjects.Container;
  private obstacleSpawner: ObstacleSpawner = new ObstacleSpawner(this);

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
    this.movingContainer = this.add.container(0, 0);
    this.movingContainer.setDepth(1);

    this.background.create();
    this.ground.create(this.movingContainer);
    this.obstacleSpawner.start(this.movingContainer, this.ground);
    this.player.create();
  }

  update() {
    this.movingContainer.x -= 2;

    this.ground.update(this.movingContainer);
    this.obstacleSpawner.update();
  }
}
