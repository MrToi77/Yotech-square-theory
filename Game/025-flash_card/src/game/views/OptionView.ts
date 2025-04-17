import OptionDTO from "../DTOs/OptionDTO";
import BaseView from "../mct_common/BaseView";

export default class OptionView extends BaseView {
    public optionData: OptionDTO;
    public buttonOption: Phaser.GameObjects.Container;
    public textQuestion: Phaser.GameObjects.Text;
    public answerContainer: Phaser.GameObjects.Container;
    public answerGroup: Phaser.GameObjects.Group;

    constructor(scene: Phaser.Scene, optionData: OptionDTO) {
        super(scene);
        this.optionData = optionData;

        // Container để gom nhóm các lựa chọn
        this.answerContainer = this.scene.add.container(0, 0);
        this.scene.add.existing(this.answerContainer);

        // Group để dễ dàng quản lý danh sách các nút
        this.answerGroup = this.scene.add.group();

        this.createOption();
        this.setViewPosition(optionData.positionX, optionData.positionY);
        this.updateContainerSize(optionData.width, optionData.height);
    }

    private createOption(): void {
        const { width, height, positionX, positionY } = this.optionData;
        const radius = 10; // Bán kính bo góc

        // Tạo graphics button
        const buttonGraphics = this.scene.add.graphics();
        buttonGraphics.fillStyle(0xffffff, 1);
        buttonGraphics.fillRoundedRect(-width / 2, -height / 2, width, height, radius);
        buttonGraphics.lineStyle(3, 0x000000);
        buttonGraphics.strokeRoundedRect(-width / 2, -height / 2, width, height, radius);

        // Tạo text
        this.textQuestion = this.scene.add.text(0, 0, `${this.optionData.value}`, {
            fontSize: "50px",
            fontStyle: "bold",
            color: "#000",
        }).setOrigin(0.5, 0.5);

        // Gộp graphics và text vào container
        this.buttonOption = this.scene.add.container(positionX, positionY, [buttonGraphics, this.textQuestion]);
        this.buttonOption.setSize(width, height);
        this.buttonOption.setInteractive({ useHandCursor: true });

        // Thêm vào container chính
        this.answerContainer.add(this.buttonOption);

        // Thêm vào group để dễ quản lý
        this.answerGroup.add(this.buttonOption); // Useless
    }
}
