
import QuestionCardDTO from "../DTOs/QuestionCardDTO";
import BaseView from "../mct_common/BaseView";
export default class CardView extends BaseView{
    private CardData: QuestionCardDTO;
    public card!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, CardData: QuestionCardDTO) {
        super(scene);
        this.CardData = CardData;
        
        this.createCard();
        
        this.setViewPosition(CardData.positionX, CardData.positionY);
    }


    private createCard(){
        this.card = this.scene.add.image(0, 0, this.CardData.texture).setOrigin(0.5, 0.5);

        this.add(this.card);
    }
    
}