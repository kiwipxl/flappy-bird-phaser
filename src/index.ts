import "phaser";
import GameScene from "./GameScene";

let game: Phaser.Game;

class RootGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.scene.add("GameScene", GameScene);
    this.scene.start("GameScene");
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "flappy-bird",
  width: 400,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: RootGame,
};

window.addEventListener("load", () => {
  game = new RootGame(config);
});
