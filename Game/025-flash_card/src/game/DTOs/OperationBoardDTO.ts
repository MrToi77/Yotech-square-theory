
export default class OperationBoardDTO {
    private _positionX: number;
    private _positionY: number;
    private _buttonSizeX: number;
    private _buttonSizeY: number;
    private _space: number;


	constructor(positionX: number, positionY: number, buttonSizeX: number, buttonSizeY: number, space: number) {
		this._positionX = positionX;
		this._positionY = positionY;
		this._buttonSizeX = buttonSizeX;
		this._buttonSizeY = buttonSizeY;
		this._space = space;
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
     * Getter buttonSizeX
     * @return {number}
     */
	public get buttonSizeX(): number {
		return this._buttonSizeX;
	}

    /**
     * Setter buttonSizeX
     * @param {number} value
     */
	public set buttonSizeX(value: number) {
		this._buttonSizeX = value;
	}


    /**
     * Getter buttonSizeY
     * @return {number}
     */
	public get buttonSizeY(): number {
		return this._buttonSizeY;
	}

    /**
     * Setter buttonSizeY
     * @param {number} value
     */
	public set buttonSizeY(value: number) {
		this._buttonSizeY = value;
	}


    /**
     * Getter space
     * @return {number}
     */
	public get space(): number {
		return this._space;
	}

    /**
     * Setter space
     * @param {number} value
     */
	public set space(value: number) {
		this._space = value;
	}

}
