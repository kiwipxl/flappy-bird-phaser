import "phaser";
import { getTextureSize } from "./util";
import Ground from "./Ground";

export default class ObstacleSpawner {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private ground: Ground;
  private obstacles: Phaser.GameObjects.Sprite[] = [];
  private spawnX: number;
  private spaceBetweenX: number = 250;
  private scale: number = 1;

  public static DEPTH: number = 50;
  private static MIN_OFFSET_Y = 50;
  private static SPACE_BETWEEN_Y = 100;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image("pipe-green", "./assets/sprites/pipe-green.png");
  }

  start(container: Phaser.GameObjects.Container, ground: Ground) {
    this.container = container;
    this.ground = ground;

    this.reset();
  }

  reset() {
    for (const obstacle of this.obstacles) {
      this.container.remove(obstacle);
    }
    this.obstacles = [];

    this.spawnX = -this.container.x + this.scene.game.scale.width;

    // Create a bunch of obstacles to begin with
    for (let n = 0; n < 5; ++n) {
      this.createObstacle();
    }
  }

  createObstacle() {
    const texture = this.scene.textures.get("pipe-green");
    texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

    const spaceBetweenY = ObstacleSpawner.SPACE_BETWEEN_Y;
    const offsetY =
      ObstacleSpawner.MIN_OFFSET_Y +
      (this.ground.y - spaceBetweenY - ObstacleSpawner.MIN_OFFSET_Y * 2) *
        Math.random();

    let topPipe = this.scene.add.sprite(this.spawnX, 0, texture);
    topPipe.setScale(this.scale, -this.scale);
    topPipe.setOrigin(0, 0);
    topPipe.setY(offsetY);
    topPipe.setDepth(ObstacleSpawner.DEPTH);
    this.container.add(topPipe);

    let bottomPipe = this.scene.add.sprite(this.spawnX, 0, texture);
    bottomPipe.setScale(this.scale, this.scale);
    bottomPipe.setOrigin(0, 0);
    bottomPipe.setY(offsetY + spaceBetweenY);
    bottomPipe.setDepth(ObstacleSpawner.DEPTH);
    this.container.add(bottomPipe);

    this.obstacles.push(topPipe);
    this.obstacles.push(bottomPipe);

    this.spawnX += this.spaceBetweenX;
  }

  update() {
    if (this.obstacles.length == 0) {
      return;
    }

    const firstObstacle = this.obstacles[0];

    if (firstObstacle.x + this.container.x < -200) {
      this.obstacles.splice(0, 1);

      this.container.remove(firstObstacle);

      this.createObstacle();
    }
  }
}
