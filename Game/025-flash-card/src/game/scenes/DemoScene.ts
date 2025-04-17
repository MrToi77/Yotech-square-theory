import CharacterDTO from "../DTOs/CharacterDTO";
import QuestionCardDTO from "../DTOs/QuestionCardDTO";
import CharacterService from "../services/AnimationandSoundService";
import OperationBoardView from "../views/OperationBoard";
import CardContentView from "../views/CardContentView";
import CardView from "../views/CardView";
import OperationBoardDTO from "../DTOs/OperationBoardDTO";
import OptionService from "../services/OptionService";
import { GenerateData } from "../Logic/GenerateData";
import NumberDTO from "../DTOs/NumberDTO";
import ScoreController from "../controllers/ScoreController";

export default class DemoScene extends Phaser.Scene {
    private characterService: CharacterService | null = null;
    private operationBoardView: OperationBoardView | null = null;
    private optionService: OptionService | null = null;
    private generateData: { data: NumberDTO; isAnswer: boolean[] };
    private cardView: CardView;
    public cardContentView: CardContentView | null = null;
    constructor() {
        super("DemoScene");
    }

    preload() {
        this.load.image(
            "backgrounds",
            "assets/flashcard_assets/background.png"
        );
        this.load.image("card", "assets/flashcard_assets/card.png");

        this.load.audio("initial", "assets/flashcard_assets/sound_initial.mp3");
        this.load.audio("failure", "assets/flashcard_assets/sound_failure.mp3");
        this.load.audio("catch", "assets/flashcard_assets/sound_catch.mp3");
        this.load.audio("success", "assets/flashcard_assets/sound_success.mp3");

        this.load.spritesheet(
            "sparkle",
            "assets/flashcard_assets/sparkle.png",
            {
                frameWidth: 140,
                frameHeight: 160,
            }
        );

        this.load.spritesheet(
            "characters",
            "assets/flashcard_assets/cast2.png",
            {
                frameWidth: 563,
                frameHeight: 395,
            }
        );
    }
    create(){
        let bg = this.add.image(0, 0, "backgrounds").setOrigin(0, 0);
        bg.setDisplaySize(
        this.sys.game.config.width as number,
        this.sys.game.config.height as number
        );
        const dataGenerator = GenerateData.getInstance();
        this.generateData = dataGenerator.getData("add");
        const cardData = new QuestionCardDTO(385, -3, "card");
        this.cardView = new CardView(this, cardData);
        const characterData = new CharacterDTO(385, 434, "characters");
        this.cardContentView = new CardContentView(this, this.generateData.data);
        this.characterService = new CharacterService(this, "", characterData, this.cardView, this.cardContentView);
        const operationBoardData = new OperationBoardDTO(10, 90, 100, 100, 0);
        this.operationBoardView = new OperationBoardView(this, operationBoardData);
        this.optionService = new OptionService(this, "", this.cardContentView, this.characterService);
        ScoreController.getInstance().resetScore();
        this.characterService.catchAnimation();
        this.characterService.initialSound();
        this.tweens.add({
            targets: this.cardView.card,
            y: 328,
            duration: 500,
            ease: 'Back.easeInOut',
            onComplete: () => {
              this.characterService?.cathSound();
              this.cardContentView?.mathContainer.setVisible(true);
            },
          });
    }
}
