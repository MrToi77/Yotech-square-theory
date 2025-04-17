export default class NumberDTO{
    private _number1: number;
    private _number2: number;
    private _answer: number;
    private _option: number[];
    private _symbol: string;


	constructor(number1: number, number2: number, answer: number, option: number[], symbol: string) {
		this._number1 = number1;
		this._number2 = number2;
		this._answer = answer;
		this._option = option;
		this._symbol = symbol;
	}

    /**
     * Getter number1
     * @return {number}
     */
	public get number1(): number {
		return this._number1;
	}

    /**
     * Setter number1
     * @param {number} value
     */
	public set number1(value: number) {
		this._number1 = value;
	}

    /**
     * Getter number2
     * @return {number}
     */
	public get number2(): number {
		return this._number2;
	}

    /**
     * Setter number2
     * @param {number} value
     */
	public set number2(value: number) {
		this._number2 = value;
	}

    /**
     * Getter answer
     * @return {number}
     */
	public get answer(): number {
		return this._answer;
	}

    /**
     * Setter answer
     * @param {number} value
     */
	public set answer(value: number) {
		this._answer = value;
	}

    /**
     * Getter option
     * @return {number[]}
     */
	public get option(): number[] {
		return this._option;
	}

    /**
     * Setter option
     * @param {number[]} value
     */
	public set option(value: number[]) {
		this._option = value;
	}

    /**
     * Getter symbol
     * @return {string}
     */
	public get symbol(): string {
		return this._symbol;
	}

    /**
     * Setter symbol
     * @param {string} value
     */
	public set symbol(value: string) {
		this._symbol = value;
	}
}