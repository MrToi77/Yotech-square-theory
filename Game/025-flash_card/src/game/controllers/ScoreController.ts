export default class ScoreController {
    private static instance: ScoreController;
    private correctScore: number = 0;
    private incorrectScore: number = 0;
    private correctText!: Phaser.GameObjects.Text;
    private incorrectText!: Phaser.GameObjects.Text;

    private constructor() {}

    public static getInstance(): ScoreController {
        if (!ScoreController.instance) {
            ScoreController.instance = new ScoreController();
        }
        return ScoreController.instance;
    }

    public setScoreTexts(correctText: Phaser.GameObjects.Text, incorrectText: Phaser.GameObjects.Text) {
        this.correctText = correctText;
        this.incorrectText = incorrectText;
        this.updateScoreText();
    }

    public updateCorrectScore(points: number) {
        this.correctScore += points;
        this.updateScoreText();
    }

    public updateIncorrectScore(points: number) {
        this.incorrectScore += points;
        this.updateScoreText();
    }

    public resetScore() {
        this.correctScore = 0;
        this.incorrectScore = 0;
        this.updateScoreText();
    }

    private updateScoreText() {
        if (this.correctText) {
            this.correctText.setText(`Correct: ${this.correctScore}`);
        }
        if (this.incorrectText) {
            this.incorrectText.setText(`Incorrect: ${this.incorrectScore}`);
        }
    }
}
