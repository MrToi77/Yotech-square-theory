import NumberDTO from "../DTOs/NumberDTO";
import BaseView from "../mct_common/BaseView";
export default class CardContentView extends BaseView {
    public contentData: NumberDTO;
    public tutorialText!: Phaser.GameObjects.Text;
    public underline!: Phaser.GameObjects.Text;
    public answerText!: Phaser.GameObjects.Text;
    public questionTextNumber1!: Phaser.GameObjects.Text;
    public questionTextNumber2!: Phaser.GameObjects.Text;
    public symbolText!: Phaser.GameObjects.Text;
    public mathContainer!: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, contentData: NumberDTO) {
        super(scene);
        this.contentData = contentData;
        this.mathContainer = this.scene.add.container(385, 250);
        this.scene.add.existing(this.mathContainer);
        this.createContent();
    }

    // Tạo điểm số
    private createText(
        x: number,
        y: number,
        text: string
    ): Phaser.GameObjects.Text {
        return this.scene.add.text(x, y, text, {
            fontSize: "32px",
            color: "#000",
            fontFamily: "Arial",
        });
    } //
    // Tạo bảng câu hỏi
    private createCenteredText(
        x: number,
        y: number,
        text: string,
        fontSize: string = "64px"
    ): Phaser.GameObjects.Text {
        return this.scene.add
            .text(x, y, text, {
                fontSize,
                fontStyle: "bold",
                color: "#000",
                fontFamily: "Arial",
                align: "center",
            })
            .setOrigin(0.5);
    } //
    private createContent() {
        // Khởi tạo container trước khi thêm các phần tử

        this.questionTextNumber1 = this.scene.add
            .text(75, 0, `${this.contentData.number1}`, {
                fontSize: "67px",
                fontStyle: "bolder",
                color: "#000",
                fontFamily: "Arial",
                align: "center",
            })
            .setOrigin(1, 0.5);

        this.questionTextNumber2 = this.scene.add
            .text(75, 80, `${this.contentData.number2}`, {
                fontSize: "67px",
                fontStyle: "bolder",
                color: "#000",
                fontFamily: "Arial",
                align: "center",
            })
            .setOrigin(1, 0.5);

        this.symbolText = this.scene.add
            .text(-30, 80, `${this.contentData.symbol}`, {
                fontSize: "67px",
                fontStyle: "bolder",
                color: "#000",
                fontFamily: "Arial",
                align: "center",
            })
            .setOrigin(1, 0.5);

        this.tutorialText = this.createText(
            0,
            -170,
            "Select an answer below."
        ).setOrigin(0.5, 0.5);
        this.underline = this.createCenteredText(0, 90, "_____");
        this.answerText = this.createCenteredText(75, 170, "");

        this.answerText.setOrigin(1, 0.5).setDepth(1);

        // Thêm các phần tử vào container
        this.mathContainer.add([
            this.questionTextNumber1,
            this.questionTextNumber2,
            this.symbolText,
            this.underline,
            this.answerText,
            this.tutorialText,
        ]);

        this.mathContainer.setVisible(false);
    }
}
