import NumberDTO from "../DTOs/NumberDTO";
import { GenerateData } from "../Logic/GenerateData";
import CardContentView from "../views/CardContentView";
import BaseService from "../mct_common/BaseService";
export default class ContentService extends BaseService<NumberDTO>{
    private cardContentView: CardContentView;
    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.createContent();
    }

    private createContent(){
        const dataGenerator = GenerateData.getInstance();
        const questionData = dataGenerator.getData("add");
        this.cardContentView = new CardContentView(this.scene, questionData.data);
        this.cardContentView.mathContainer.setVisible(false);
        this.scene.add.existing(this.cardContentView);
    }
}