import EdgeService from "../services/EdgeService";
export default class EdgeController{
    private scene: Phaser.Scene;
    private edgeService: EdgeService;
    constructor(scene: Phaser.Scene){
        this.scene = scene;
        this.edgeService = new EdgeService(scene);
    }
}