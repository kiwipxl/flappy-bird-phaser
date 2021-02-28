import "phaser";
import BackgroundSpawner from "./BackgroundSpawner";
import Player from "./Player";

export default class GameScene extends Phaser.Scene {
  private bgSpawner: BackgroundSpawner = new BackgroundSpawner(this);
  private player: Player = new Player(this);

  constructor() {
    super("GameScene");
  }

  preload() {
    this.bgSpawner.preload();
    this.player.preload();
  }

  create() {
    this.bgSpawner.create();
    this.player.create();
  }

  update() {}
}
