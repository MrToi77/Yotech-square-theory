import OptionDTO from "../DTOs/OptionDTO";
import OptionView from "../views/OptionView";
import BaseService from "../mct_common/BaseService";
import { GenerateData } from "../Logic/GenerateData";
import ScoreController from "../controllers/ScoreController";
import ContentController from "../controllers/ContentController";
import CardContentView from "../views/CardContentView";
import NumberDTO from "../DTOs/NumberDTO";
import CharacterService from "./AnimationandSoundService";
import TextService from "./TextService";

const RANDOM_COUNT_NUMBER: number = 5;
const CORRECT_SCORE: number = 1;
const INCORRECT_SCORE: number = 1;

export default class OptionService extends BaseService<OptionDTO> {
    public optionViews: OptionView[] = [];
    private dataGenerator = GenerateData.getInstance();
    private contentController: ContentController;
    private questionData: { data: NumberDTO; isAnswer: boolean[] };
    private characterService: CharacterService;
    private textService: TextService;
    private cardContentView: CardContentView;
    constructor(
        scene: Phaser.Scene,
        jsonPath: string,
        cardContentView: CardContentView,
        characterService: CharacterService
    ) {
        super(scene, jsonPath);
        this.contentController = ContentController.getInstance(cardContentView);
        this.characterService = characterService;
        this.cardContentView = cardContentView;
        this.textService = new TextService();
        this.createOptionViews();
    }

    private createOptionViews() {
        this.questionData = this.dataGenerator.getData(
            this.dataGenerator.currentType
        );

        for (let i = 0; i < RANDOM_COUNT_NUMBER; i++) {
            let xPos = 110 + i * 140;
            let yPos = 680;
            let width = 125;
            let height = 125;
            let radius = 20;
            const optionData = new OptionDTO(
                i,
                this.questionData.isAnswer[i],
                this.questionData.data.option[i],
                xPos,
                yPos,
                width,
                height,
                radius
            );

            const optionView = new OptionView(this.scene, optionData);
            this.optionViews.push(optionView);
            this.scene.add.existing(optionView);

            optionView.buttonOption.on("pointerdown", () => {
                this.handleOptionClick(i, this.questionData.isAnswer[i]);
                this.contentController.updateAnswer(
                    this.questionData.data.option[i].toString()
                );
            });
        }
    }

    private updateOptionTexts() {
        this.questionData = this.dataGenerator.getData(
            this.dataGenerator.currentType
        );

        this.optionViews.forEach((optionView, index) => {
            if (this.questionData.data.option[index] !== undefined) {
                optionView.textQuestion.setText(
                    this.questionData.data.option[index].toString()
                );
                optionView.buttonOption.setVisible(true);
                optionView.buttonOption.setInteractive({ useHandCursor: true });
            }
        });
    }

    private handleOptionClick(index: number, isCorrect: boolean): void {
        console.log(`Option ${index} selected, Correct: ${isCorrect}`);
        this.hideOtherOptions();
        if (isCorrect) {
            ScoreController.getInstance().updateCorrectScore(CORRECT_SCORE);
            this.characterService.successAnimation();
            this.characterService.successSound();
            this.characterService.sparkleAnimation();
            const message: string = this.textService.getSuccessMessage();
            this.cardContentView.tutorialText.setText(message)
        } else {
            ScoreController.getInstance().updateIncorrectScore(INCORRECT_SCORE);
            this.characterService.failureAnimation();
            this.characterService.failSound();
            const message: string = this.textService.getFailureMessage();
            this.cardContentView.tutorialText.setText(message)
        }
        this.scene.time.delayedCall(1500, () => {
            const message: string = this.textService.getInitialMessage();
            this.cardContentView.tutorialText.setText(message);
            this.characterService.dropCardAnimation(() => {
                this.characterService.catchAnimation();
                const newQuestionData = this.dataGenerator.refreshData(
                    this.dataGenerator.currentType
                );
                this.contentController.updateQuestion(newQuestionData.data); // Cập nhật câu hỏi
                this.updateOptionTexts();
            });
        });
    }

    private hideOtherOptions(): void {
        this.optionViews.forEach((optionView) => {
            optionView.buttonOption.setVisible(false);
        });
    }
}
