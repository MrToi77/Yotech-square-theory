import ScoreController from "../controllers/ScoreController";

export default class ScoreScene extends Phaser.Scene {
    constructor() {
        super({ key: "ScoreScene", active: true });
    }

    create() {
        const correctText = this.add.text(150, 16, "Correct: 0", {
            fontSize: "32px",
            color: "#000000",
            fontFamily: "Arial",
        });

        const incorrectText = this.add.text(450, 16, "Incorrect: 0", {
            fontSize: "32px",
            color: "#000000",
            fontFamily: "Arial",
        });

        ScoreController.getInstance().setScoreTexts(correctText, incorrectText);
    }
}
