import "phaser";
import { getTextureSize } from "./util";
import Ground from "./Ground";
import PipeObstacle from "./PipeObstacle";
import Player from "./Player";

export default class ObstacleSpawner {
  private scene: Phaser.Scene;
  private ground: Ground;
  private player: Player;

  private obstacles: PipeObstacle[] = [];
  private spawnX: number = 0;
  private spaceBetweenX: number = 250;

  public static DEPTH: number = 50;
  private static MIN_OFFSET_Y = 50;
  private static SPACE_BETWEEN_Y = 150;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image("pipe-green", "./assets/sprites/pipe-green.png");
  }

  start(ground: Ground, player: Player) {
    this.ground = ground;
    this.player = player;

    const texture = this.scene.textures.get("pipe-green");
    texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

    this.reset();
  }

  reset() {
    for (const obstacle of this.obstacles) {
      this.scene.children.remove(obstacle);
    }
    this.obstacles = [];

    // Create a bunch of obstacles to begin with
    for (let n = 0; n < 5; ++n) {
      this.createPipe();
    }
  }

  createPipe() {
    const x = this.spawnX + this.scene.game.scale.width;

    const spaceBetweenY = ObstacleSpawner.SPACE_BETWEEN_Y;
    const offsetY =
      ObstacleSpawner.MIN_OFFSET_Y +
      (this.ground.y - spaceBetweenY - ObstacleSpawner.MIN_OFFSET_Y * 2) *
        Math.random();

    let topPipe = new PipeObstacle(this.scene, x, offsetY);
    topPipe.setScale(1, -1);
    this.scene.add.existing(topPipe);

    let bottomPipe = new PipeObstacle(this.scene, x, offsetY + spaceBetweenY);
    bottomPipe.setScale(1, 1);
    this.scene.add.existing(bottomPipe);

    this.obstacles.push(topPipe);
    this.obstacles.push(bottomPipe);

    this.scene.physics.add.overlap(
      this.player.sprite,
      [topPipe.collider, bottomPipe.collider],
      this.onPipeCollided.bind(this)
    );

    this.spawnX += this.spaceBetweenX;
  }

  onPipeCollided() {
    this.player.sprite.setScale(2, 2);
  }

  update(scrollSpeed: number) {
    if (this.obstacles.length == 0) {
      return;
    }

    const firstObstacle = this.obstacles[0];

    if (firstObstacle.x < -200) {
      this.obstacles.splice(0, 1);

      this.scene.children.remove(firstObstacle);

      this.createPipe();
    }

    for (const obstacle of this.obstacles) {
      obstacle.x -= scrollSpeed;

      obstacle.update();
    }
  }
}
