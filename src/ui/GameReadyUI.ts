import "phaser";

export default class GameReadyUI extends Phaser.GameObjects.GameObject {
  private title: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    super(scene, "GameReadyUI");

    this.title = scene.add.image(200, 100, "ready-title");
    this.title.setOrigin(0.5, 0.5);
  }

  update() {}

  destroy() {
    this.scene.children.remove(this.title);
  }
}
