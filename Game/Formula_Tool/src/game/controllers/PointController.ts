import PointService from "../services/PointService";
export default class PointController{
    private scene: Phaser.Scene;
    private pointService: PointService;
    constructor(scene: Phaser.Scene){
        this.scene = scene;
        this.pointService = new PointService(scene);
    }
}