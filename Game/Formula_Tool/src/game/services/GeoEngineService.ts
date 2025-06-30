import EdgeView from "../views/EdgeView";
import EdgeDTO from "../dtos/EdgeDTO";
import { FunctionEdge } from "../enums/FunctionEnum";
import PointView from "../views/PointView";
import geoGeneralProperty from "../generalProperty/geoGeneralProperty";
import PointDTO from "../dtos/PointDTO";
let indexPoint = 1;
export default class GeoEngineService{
    private scene: Phaser.Scene;
    private generalProp: geoGeneralProperty;
    private pointManager: Record<string, PointView> = {};
    constructor(scene: Phaser.Scene, generalProp: geoGeneralProperty){
        this.scene = scene;
        this.generalProp = generalProp;
    }

    public callFunction(req: string, object: EdgeView, angle: number = 0, ratioAxisPoint: number = 0){
        switch(req){
            case FunctionEdge.DrawEdge:
                object.draw(object.edge.color, 1000);
                break;
            case FunctionEdge.SplitEdgeAnimation:
                object.AnimationSplitEdge(object.edge.ratios, this.generalProp.culTime);
                this.generalProp.culTime += 1000;
                break;
            case FunctionEdge.SplitEdgeNoAnimation:
                object.NoAnimationSplitEdge(object.edge.ratios);
                break;
            case FunctionEdge.RotateEdge:
                object.rotate(ratioAxisPoint, angle);
                break;
            case FunctionEdge.DeleteEdge:
                object.destroy();
                break;
            default:
                console.log("Data is invalid");
        }
        
    }

    public setPoint(point: PointDTO): void{
        const pointView = new PointView(this.scene, point);
        pointView.draw();
        this.pointManager[`${indexPoint}`] = pointView;
        
        indexPoint++;
    }

    public deletePoint(index: number): void{
        const getPoint = this.pointManager[`${index}`];
        getPoint.animDes();
        getPoint.destroy();
    }
}