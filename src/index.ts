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
      gravity: { y: 1400 },
      debug: true,
      debugShowBody: true,
      debugShowStaticBody: true,
      debugShowVelocity: true,
      debugVelocityColor: 0xffff00,
      debugBodyColor: 0x0000ff,
      debugStaticBodyColor: 0xffffff,
    },
  },
  scene: RootGame,
};

window.addEventListener("load", () => {
  game = new RootGame(config);
});
