export class FlashCard extends Phaser.Scene {
    constructor(){
        super({key: "FlashCard"});
    }

    preload(){
    this.load.image("backgrounds", "assets/flashcard_assets/background.png");
    this.load.image("card", "assets/flashcard_assets/card.png");

    this.load.audio("initial", "assets/flashcard_assets/sound_initial.mp3");
    this.load.audio("failure", "assets/flashcard_assets/sound_failure.mp3");
    this.load.audio("catch", "assets/flashcard_assets/sound_catch.mp3");
    this.load.audio("success", "assets/flashcard_assets/sound_success.mp3");
  }
    create(){}
}