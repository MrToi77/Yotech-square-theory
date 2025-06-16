import CellService from "../services/CellService";
import CellDTO from "../dtos/CellDTO";
export default class CellController{
    private scene: Phaser.Scene;
    private cellService: CellService;
    constructor(scene: Phaser.Scene){
        this.scene = scene;
        this.cellService = new CellService(scene);
    }
}