export default class OptionDTO {
    private _optionId: number;
    private _isAnswer: boolean;
    private _value: number;
    private _positionX: number;
    private _positionY: number;
    private _width: number;
    private _height: number;
    private _radius: number;

    constructor(optionId: number, isAnswer: boolean, value: number, positionX: number, positionY: number, width: number, height: number, radius: number) {
        this._optionId = optionId;
        this._isAnswer = isAnswer;
        this._value = value;
        this._positionX = positionX;
        this._positionY = positionY;
        this._width = width;
        this._height = height;
        this._radius = radius;
    }

    // Getters
    public get optionId(): number {
        return this._optionId;
    }

    public get isAnswer(): boolean {
        return this._isAnswer;
    }

    public get value(): number {
        return this._value;
    }

    public get positionX(): number {
        return this._positionX;
    }

    public get positionY(): number {
        return this._positionY;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get radius(): number {
        return this._radius;
    }

    // Setters
    public set optionId(value: number) {
        this._optionId = value;
    }

    public set isAnswer(value: boolean) {
        this._isAnswer = value;
    }

    public set value(val: number) {
        this._value = val;
    }

    public set positionX(value: number) {
        this._positionX = value;
    }

    public set positionY(value: number) {
        this._positionY = value;
    }

    public set width(value: number) {
        this._width = value;
    }

    public set height(value: number) {
        this._height = value;
    }

    public set radius(value: number) {
        this._radius = value;
    }
}

