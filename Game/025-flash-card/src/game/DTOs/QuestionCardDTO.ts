export default class QuestionCardDTO {
    private _positionX: number;
    private _positionY: number;
    private _texture: string;

    constructor(positionX: number, positionY: number, texture: string) {
        this._positionX = positionX;
        this._positionY = positionY;
        this._texture = texture;
    }

    // Getters
    public get positionX(): number {
        return this._positionX;
    }

    public get positionY(): number {
        return this._positionY;
    }


    // Setters
    public set positionX(value: number) {
        this._positionX = value;
    }

    public set positionY(value: number) {
        this._positionY = value;
    }
    

    /**
     * Getter texture
     * @return {string}
     */
	public get texture(): string {
		return this._texture;
	}

    /**
     * Setter texture
     * @param {string} value
     */
	public set texture(value: string) {
		this._texture = value;
	}


}
