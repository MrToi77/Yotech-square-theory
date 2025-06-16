import PointDTO from "./PointDTO";
export default class LabelDTO{
    public char: string;
    public position: PointDTO;
    constructor(position: PointDTO, char: string){
        this.position = position;
        this.char = char;
    }
}