import OperationBoardDTO from "../DTOs/OperationBoardDTO";
import BaseView from "../mct_common/BaseView";
import { GenerateData } from "../Logic/GenerateData";
const HExA_BUTTON: number = 0xfff66d;

export default class OperationBoardView extends BaseView {
    public operationBoardData: OperationBoardDTO;
    public currentType: string;
    private dataGenerator = GenerateData.getInstance();
    private operationBoard!: Phaser.GameObjects.Container;
    constructor(scene: Phaser.Scene, operationBoardData: OperationBoardDTO) {
            super(scene);
            this.operationBoardData = operationBoardData;
            this.createOperationBoard(operationBoardData.positionX, operationBoardData.positionY, operationBoardData.buttonSizeX, operationBoardData.buttonSizeY, operationBoardData.space);
    }
    createOperationBoard(
        boardX: number,
        boardY: number,
        buttonSizeX: number,
        buttonSizeY: number,
        spacing: number
      ): void {
        this.operationBoard = this.scene.add.container(boardX, boardY);
    
        let operations: {
          symbol: string;
          type: string;
        }[] = [
          { symbol: "+", type: "add" },
          { symbol: "-", type: "subtract" },
          { symbol: "×", type: "multiply" },
          { symbol: "÷", type: "divide" },
        ];
    
        let selectedButton: Phaser.GameObjects.Rectangle | null = null;
    
        operations.forEach((operation, index) => {
          let yOffset: number = index * (buttonSizeY + spacing);
    
          let button: Phaser.GameObjects.Rectangle = this.scene.add
            .rectangle(0, yOffset, buttonSizeX, buttonSizeY, 0xffffff)
            .setStrokeStyle(2, 0x000000)
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true });
    
          let text: Phaser.GameObjects.Text = this.scene.add
            .text(buttonSizeX / 2, yOffset + buttonSizeY / 2, operation.symbol, {
              fontSize: "77px",
              fontStyle: "bolder",
              color: "#000",
            })
            .setOrigin(0.5).setResolution(2);
    
          if (index === 0) {
            selectedButton = button;
            button.setFillStyle(HExA_BUTTON);
          }
    
          button.on("pointerdown", () => {
            if (selectedButton && selectedButton !== button) {
              selectedButton.setFillStyle(0xffffff);
            }
    
            selectedButton = button;
            button.setFillStyle(HExA_BUTTON);
    
            this.dataGenerator.currentType = operation.type;
            this.dataGenerator.refreshData(this.dataGenerator.currentType);
          });
    
          button.on("pointerover", () => {
            if (selectedButton !== button) button.setFillStyle(0xdddddd);
          });
    
          button.on("pointerout", () => {
            if (selectedButton !== button) button.setFillStyle(0xffffff);
          });
    
          this.operationBoard.add([button, text]);
        });
    
        this.scene.add.existing(this.operationBoard);
      }
}
