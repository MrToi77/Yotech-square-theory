export default class ScoreDTO{
    private _positionX: number;
    private _positionY: number;
    private _text: string;
    public _incorrectScore: number;
    public _correctScore: number;


	constructor(positionX: number, positionY: number, text: string) {
		this._positionX = positionX;
		this._positionY = positionY;
		this._text = text;
	}
    

    /**
     * Getter positionX
     * @return {number}
     */
	public get positionX(): number {
		return this._positionX;
	}

    /**
     * Setter positionX
     * @param {number} value
     */
	public set positionX(value: number) {
		this._positionX = value;
	}


    /**
     * Getter positionY
     * @return {number}
     */
	public get positionY(): number {
		return this._positionY;
	}

    /**
     * Setter positionY
     * @param {number} value
     */
	public set positionY(value: number) {
		this._positionY = value;
	}


    /**
     * Getter text
     * @return {string}
     */
	public get text(): string {
		return this._text;
	}

    /**
     * Setter text
     * @param {string} value
     */
	public set text(value: string) {
		this._text = value;
	}

}