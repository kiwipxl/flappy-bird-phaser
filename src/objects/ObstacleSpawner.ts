import "phaser";
import Ground from "./Ground";
import PipeObstacle from "./PipeObstacle";
import Player from "./Player";

export default class ObstacleSpawner {
  private scene: Phaser.Scene;
  private ground: Ground;
  private player: Player;

  public obstacles: PipeObstacle[] = [];

  public onHitObstacle: () => void;

  // How much space to leave between the top and bottom (ground) where the pipes spawn.
  private static MIN_OFFSET_Y = 50;

  // How much of a gap/space to leave for flappy boy to go through
  private static PIPE_GAP = 150;
  // How much of a gap/space to leave for flappy boy to go through (for HARD (red) pipes)
  private static PIPE_GAP_HARD = 120;

  // How much space between each obstacle. The lower the value, the more squished obstacles/pipes will be
  private static SPACE_BETWEEN_X: number = 250;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  preload() {
    this.scene.load.image("pipe-green", "./assets/sprites/pipe-green.png");
    this.scene.load.image("pipe-red", "./assets/sprites/pipe-red.png");
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
      this.scene.children.remove(obstacle.collider);
      this.scene.physics.world.remove(obstacle.collider.body);
    }
    this.obstacles = [];

    // Create a bunch of obstacles to begin with
    for (let n = 0; n < 5; ++n) {
      this.createPipe();
    }
  }

  createPipe() {
    let x = 0;
    if (this.obstacles.length > 0) {
      // If we already have obstacles, spawn next to the last one spawned.
      x =
        this.obstacles[this.obstacles.length - 1].x +
        ObstacleSpawner.SPACE_BETWEEN_X;
    } else {
      // Without any obstacles, start spawning outside the screen
      x = this.scene.game.scale.width + 100;
    }

    // A hard pipe is one with a smaller gap. It spawns less frequently.
    const hardPipe = Math.random() > 0.65;
    let spaceBetweenY = hardPipe
      ? ObstacleSpawner.PIPE_GAP_HARD
      : ObstacleSpawner.PIPE_GAP;

    // Calculate where our pipe is vertically
    const y =
      ObstacleSpawner.MIN_OFFSET_Y +
      (this.ground.y - spaceBetweenY - ObstacleSpawner.MIN_OFFSET_Y * 2) *
        Math.random();

    // Create our top pipe
    let topPipe = new PipeObstacle(this.scene, x, y, hardPipe);
    topPipe.setScale(1, -1);
    this.scene.add.existing(topPipe);

    // Create our bottom pipe
    let bottomPipe = new PipeObstacle(
      this.scene,
      x,
      y + spaceBetweenY,
      hardPipe
    );
    bottomPipe.setScale(1, 1);
    this.scene.add.existing(bottomPipe);

    this.obstacles.push(topPipe);
    this.obstacles.push(bottomPipe);

    const collider = this.scene.physics.add.overlap(
      this.player.sprite,
      [topPipe.collider, bottomPipe.collider],
      () => {
        this.onHitObstacle();
        // Make sure we remove the collider, otherwise we'll keep colliding with it forever
        this.scene.physics.world.removeCollider(collider);
      }
    );
  }

  update(scrollSpeed: number) {
    if (this.obstacles.length == 0) {
      return;
    }

    // Remove obstacles that go outside the screen on the left
    const firstObstacle = this.obstacles[0];

    if (firstObstacle.x < -200) {
      this.obstacles.splice(0, 1);

      this.scene.children.remove(firstObstacle);
      this.scene.children.remove(firstObstacle.collider);
      this.scene.physics.world.remove(firstObstacle.collider.body);

      this.createPipe();
    }

    for (const obstacle of this.obstacles) {
      obstacle.x -= scrollSpeed;

      obstacle.update();
    }
  }
}
