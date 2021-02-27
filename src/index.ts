import "phaser";
import GameScene from "./GameScene";

let game: Phaser.Game;

class RootGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    window.addEventListener("resize", (ev) =>
      this.scale.resize(window.innerWidth, window.innerHeight)
    );

    this.scene.add("GameScene", GameScene);
    this.scene.start("GameScene");
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

window.addEventListener("load", () => {
  game = new RootGame(config);
});
