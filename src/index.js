import Phaser from "phaser";
import birdImage from "./assets/sprites/bluebird-downflap.png";

class RootGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("bird", birdImage);
  }

  create() {
    this.player = this.add.sprite(200, 200, "bird");
    const group = this.physics.add.group(this.player);

    this.input.on("pointerdown", (pointer) => {
      group.setVelocityY(-420);
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "flappy-bird",
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1400 },
      debug: false,
    },
  },
  scene: RootGame,
};

const game = new Phaser.Game(config);

window.addEventListener("resize", (ev) =>
  game.scale.resize(window.innerWidth, window.innerHeight)
);
