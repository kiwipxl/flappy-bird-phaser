import Phaser from "phaser";

class RootGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    // this.load.image("logo", logoImg);
  }

  create() {
    // const logo = this.add.image(400, 150, "logo");
    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1,
    // });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "flappy-bird",
  width: window.innerWidth,
  height: window.innerHeight,
  scene: RootGame,
};

const game = new Phaser.Game(config);

window.addEventListener("resize", (ev) =>
  game.scale.resize(window.innerWidth, window.innerHeight)
);
