const RANGE_MAX_NUMBER: number = 9;
const RANDOM_COUNT_NUMBER: number = 5;
import NumberDTO from "../DTOs/NumberDTO";

export class GenerateData {
    private static instance: GenerateData; // Singleton instance
    private cachedData: NumberDTO | null = null;
    private cachedIsAnswer: boolean[] = []; // Mảng isAnswer thứ 2
    public currentType: string = "add";

    private constructor() {}

    public static getInstance(): GenerateData {
        if (!GenerateData.instance) {
            GenerateData.instance = new GenerateData();
        }
        return GenerateData.instance;
    }

    private generateNumbers(type: string): [number, number] {
        let num1: number = Math.floor(Math.random() * RANGE_MAX_NUMBER) + 1;
        let num2: number = Math.floor(Math.random() * RANGE_MAX_NUMBER) + 1;

        if (type === "subtract" && num1 < num2) {
            [num1, num2] = [num2, num1];
        } else if (type === "divide") {
            num1 = num2 * (Math.floor(Math.random() * RANGE_MAX_NUMBER) + 1);
        }

        return [num1, num2];
    }

    private getSymbol(type: string) : string {
        return type === "add"
            ? "+"
            : type === "subtract"
            ? "-"
            : type === "multiply"
            ? "×"
            : "÷";
    }

    private calculateAnswer(num1: number, num2: number, type: string): number {
        return type === "add"
            ? num1 + num2
            : type === "subtract"
            ? num1 - num2
            : type === "multiply"
            ? num1 * num2
            : num1 / num2;
    }

    private generateOptions(correctAnswer: number): number[] {
        const options: Set<number> = new Set();
        const randomIndex: number = Math.floor(Math.random() * RANDOM_COUNT_NUMBER);
        let i: number = 0;

        while (options.size < RANDOM_COUNT_NUMBER) {
            if (i === randomIndex) {
                options.add(correctAnswer);
            } else {
                const randomAnswer: number = correctAnswer + Math.floor(Math.random() * 10) - 5;
                if (randomAnswer !== correctAnswer && randomAnswer >= 0) {
                    options.add(randomAnswer);
                }
            }
            i++;
        }

        return Array.from(options);
    }

    private generateIsAnswerArray(options: number[], correctAnswer: number): boolean[] {
        console.log(options.map(option => option === correctAnswer));
        return options.map(option => option === correctAnswer);
    }

    public getData(type: string): { data: NumberDTO; isAnswer: boolean[] } {
        if (!this.cachedData) { 
            const [number1, number2] = this.generateNumbers(type);
            const answer = this.calculateAnswer(number1, number2, type);
            const options = this.generateOptions(answer);
            const isAnswer = this.generateIsAnswerArray(options, answer); // Tạo mảng isAnswer
            this.cachedIsAnswer = isAnswer; // Lưu mảng isAnswer vào cachedIsAnswer
            const symbol = this.getSymbol(type);
            this.cachedData = new NumberDTO(number1, number2, answer, options, symbol);
            return { data: this.cachedData, isAnswer: this.cachedIsAnswer };
        }
        return { data: this.cachedData, isAnswer: this.cachedIsAnswer }; // Trả về cachedIsAnswer
    }

    public refreshData(type: string): { data: NumberDTO; isAnswer: boolean[] } {
        const [number1, number2] = this.generateNumbers(type);
        const answer = this.calculateAnswer(number1, number2, type);
        const options = this.generateOptions(answer);
        const isAnswer = this.generateIsAnswerArray(options, answer);
        this.cachedIsAnswer = isAnswer; // Cập nhật lại cachedIsAnswer
        const symbol = this.getSymbol(type);
        this.cachedData = new NumberDTO(number1, number2, answer, options, symbol);
        return { data: this.cachedData, isAnswer: this.cachedIsAnswer };
    }
}
