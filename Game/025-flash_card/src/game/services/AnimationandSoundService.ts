import CharacterDTO from "../DTOs/CharacterDTO";
import CharacterView from "../views/AnimationandSound";
import BaseService from "../mct_common/BaseService";
import CardView from "../views/CardView";
import CardContentView from "../views/CardContentView";
const easeBox: string = 'Back.easeInOut';
export default class CharacterService extends BaseService<CharacterDTO>{
    private characterView!: CharacterView;
    private cardView: CardView;
    private cardContentView: CardContentView;
    constructor(scene: Phaser.Scene, jsonPath: string, data: CharacterDTO, cardView: CardView, cardContentView: CardContentView){
        super(scene, jsonPath);
        this.characterView = new CharacterView(this.scene, data);
        this.cardView = cardView;
        this.cardContentView = cardContentView;
        this.scene.add.existing(this.characterView);
    }
    initialSound(): void{
      this.characterView.initial.play();
    }
    successSound(): void{
      this.characterView.success.play();
    }
    failSound(): void{
      this.characterView.failure.play();
    }
    cathSound(): void{
      this.characterView.catch.play();
    }
    catchAnimation(): void {
        this.characterView.character.play("character-catch");
      }//
    waitAnimation(): void {
        this.characterView.character.play("character-wait");
      }//
      
    successAnimation(): void {
        this.characterView.character.play("character-success");
      }//
      
    failureAnimation(): void {
        this.characterView.character.play("character-fail");
      }
    sparkleAnimation(): void{
      this.characterView.sparkle.play("sparkle");
    }

    dropCardAnimation(onCompleteCallback?: () => void): void {
      this.cardContentView.mathContainer.setVisible(false);
      this.waitAnimation();
      this.scene.tweens.add({
        targets: this.cardView.card,
        y: 750,
        duration: 1000,
        ease: easeBox,
        onComplete: () => {
          this.cardView.card.y = -150;
          if (onCompleteCallback) onCompleteCallback();
  
          this.scene.tweens.add({
            targets: this.cardView.card,
            y: 328,
            duration: 500,
            ease: easeBox,
            onComplete: () => {
              this.cathSound();
              this.cardContentView.mathContainer.setVisible(true);
            },
          });
        },
      });
    }//
}