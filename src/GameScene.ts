import "phaser";
import Background from "./Background";
import Ground from "./Ground";
import Player from "./Player";

export default class GameScene extends Phaser.Scene {
  private background: Background = new Background(this);
  private ground: Ground = new Ground(this);
  private player: Player = new Player(this);
  private movingContainer: Phaser.GameObjects.Container;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.background.preload();
    this.ground.preload();
    this.player.preload();
  }

  create() {
    this.background.create();

    this.movingContainer = this.add.container(0, 0);
    this.ground.create(this.movingContainer);

    this.player.create();
  }

  update() {
    this.movingContainer.x -= 2;

    this.ground.update(this.movingContainer);
  }
}
