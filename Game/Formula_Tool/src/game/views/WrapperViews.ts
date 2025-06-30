import EdgeView from "./EdgeView";
import PointView from "./PointView";
export class EdgeViewWrapper extends EdgeView {
    public id: number;
    constructor(id: number, scene: Phaser.Scene, data: any) {
        console.log('EdgeViewWrapper scene:', scene);
      super(scene, data);
      this.id = id;
    }
}

export class PointViewWrapper extends PointView {
    public id: number;
    constructor(id: number, scene: Phaser.Scene, data: any) {
      super(scene, data);
      this.id = id;
    }
}