
import CardContentView from "../views/CardContentView";
import NumberDTO from "../DTOs/NumberDTO";

export default class ContentController {
    private static instance: ContentController;
    private cardContentView: CardContentView;

    private constructor(cardContentView: CardContentView) {
        this.cardContentView = cardContentView;
    }

    public static getInstance(cardContentView: CardContentView): ContentController {
        if (!ContentController.instance) {
            ContentController.instance = new ContentController(cardContentView);
        }
        return ContentController.instance;
    }

    // Cập nhật câu hỏi mới
    public updateQuestion(contentData: NumberDTO): void {
        this.cardContentView.contentData = contentData;
        this.cardContentView.questionTextNumber1.setText(contentData.number1.toString());
        this.cardContentView.questionTextNumber2.setText(contentData.number2.toString());
        this.cardContentView.symbolText.setText(contentData.symbol);
        this.cardContentView.answerText.setText("");
    }

    // Cập nhật câu trả lời
    public updateAnswer(answer: string): void {
        this.cardContentView.answerText.setText(answer);
    }
}
