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

  preload() {
    this.load.bitmapFont(
      "flappy-bird-font",
      "./assets/fonts/flappy_bird_numbers_48px.png",
      "./assets/fonts/flappy_bird_numbers_48px.fnt"
    );

    this.gameManager = new GameManager(this, "GameManager");
    this.gameManager.preload();
    this.gameManager.onUpdateScore = (newScore: number) =>
      (this.score = newScore);
  }

  create() {
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
        break;

      case GameState.GameOver:
        break;
    }
  }

  setGameState(newState: GameState) {
    switch (newState) {
      case GameState.GameReady:
        this.gameManager.pause();
        this.add.existing(new GameReadyUI(this));

        this.input.once("pointerdown", () =>
          this.setGameState(GameState.GameActive)
        );
        break;

      case GameState.GameActive:
        this.gameManager.start();
        this.add.existing(new GameActiveUI(this));
        break;

      case GameState.GameOver:
        this.gameManager.pause();
        this.add.existing(new GameOverUI(this));
        break;
    }
  }
}
