import "phaser";
import GameManager from "./GameManager";
import GameReadyUI from "./ui/GameReadyUI";
import GameActiveUI from "./ui/GameActiveUI";
import GameOverUI from "./ui/GameOverUI";

enum GameState {
  GameReady,
  GameActive,
  GameOver,
}

export default class RootScene extends Phaser.Scene {
  private score: number = 0;
  private state: GameState;

  private gameManager: GameManager;
  private currentUI: Phaser.GameObjects.GameObject;

  preload() {
    this.load.image("ready-title", "./assets/sprites/ready-title.png");
    this.load.image("gameover-title", "./assets/sprites/gameover.png");

    this.load.bitmapFont(
      "flappy-bird-font",
      "./assets/fonts/flappy_bird_numbers_48px.png",
      "./assets/fonts/flappy_bird_numbers_48px.fnt"
    );

    this.gameManager = new GameManager(this, "GameManager");
    this.gameManager.preload();

    this.gameManager.onUpdateScore = (newScore: number) =>
      (this.score = newScore);

    this.gameManager.onGameOver = () => this.setGameState(GameState.GameOver);
  }

  create() {
    this.textures
      .get("flappy-bird-font")
      .setFilter(Phaser.Textures.FilterMode.NEAREST);

    this.gameManager.create();
    this.add.existing(this.gameManager);

    this.setGameState(GameState.GameReady);
  }

  update() {
    this.gameManager.score = this.score;
    this.gameManager.update();

    switch (this.state) {
      case GameState.GameReady:
        break;

      case GameState.GameActive:
        const activeUI = this.currentUI as GameActiveUI;
        activeUI.score = this.score;
        break;

      case GameState.GameOver:
        break;
    }

    if (this.currentUI) {
      this.currentUI.update();
    }
  }

  setGameState(newState: GameState) {
    if (this.state === newState) {
      return;
    }
    this.state = newState;

    if (this.currentUI) {
      this.currentUI.destroy();
    }

    switch (newState) {
      case GameState.GameReady:
        this.gameManager.pause();

        this.currentUI = new GameReadyUI(this);
        this.add.existing(this.currentUI);

        this.input.once("pointerdown", () =>
          this.setGameState(GameState.GameActive)
        );
        break;

      case GameState.GameActive:
        this.gameManager.start();

        this.currentUI = new GameActiveUI(this);
        this.add.existing(this.currentUI);
        break;

      case GameState.GameOver:
        this.gameManager.pause();

        this.currentUI = new GameOverUI(this, this.score);
        this.add.existing(this.currentUI);

        this.input.once("pointerdown", () => {
          // reset game
          this.score = 0;
          this.setGameState(GameState.GameActive);
        });
        break;
    }
  }
}
