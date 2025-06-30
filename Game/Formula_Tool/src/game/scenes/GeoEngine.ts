import EdgeView from "../views/EdgeView";
import PointDTO from "../dtos/PointDTO";
import EdgeDTO from "../dtos/EdgeDTO";
import { PointsData } from "../types/PointDataType";
import { EdgesData } from "../types/EdgesDataType";
import { StepDataNew, StepsData } from "../types/StepsDataType";
import GeoEngineService from "../services/GeoEngineService";
import geoGeneralProperty from "../generalProperty/geoGeneralProperty";
import { ReflectionUtil } from "../utils/Reflection";
import { EntityRegistry } from "../utils/EntityRegistry";
import PointView from "../views/PointView";
import EdgeDTOWrapper from "../dtos/WrapperDTOs";
import { EdgeViewWrapper } from "../views/WrapperViews";
import { PointViewWrapper } from "../views/WrapperViews";
let indexPoint = 1;
export default class GeoEngine extends Phaser.Scene {
    private geoData: any;
    private edges: EdgesData;
    private points: PointsData;
    private edgeDTOs: Record<string, EdgeDTO> = {};
    private edgeViews: Record<string, EdgeView> = {};
    private service: GeoEngineService;
    private generalProp: geoGeneralProperty;
    private entities: any[];

    constructor() {
        super("GeoEngine");
        this.geoData = null;
        this.generalProp = new geoGeneralProperty();
    }

    init(data: any) {
        this.geoData = data;
        console.log(this.geoData);
    }

    preload() {}

    create() {
        // Đăng kí type
        EntityRegistry.register("point", PointDTO, PointViewWrapper);
        EntityRegistry.register("edge", EdgeDTOWrapper, EdgeViewWrapper);
        this.entities = [];
        // 01: Init all entities
        this.geoData.entities.forEach((item: any) => {
            const dto = EntityRegistry.createDTO(item.type, item.data);
            const view = EntityRegistry.createView(item.id, item.type, this, dto);
            this.entities.push(view);
          });
        
        // 02: Run all the steps
        let culDelay = 0;
        this.geoData.steps.forEach((step: StepDataNew) => {
            this.time.delayedCall(step.duration, () => {
                step.entities.forEach((entityId) => {
                  const entity = this.entities.find((item) => item.id === entityId);
                  console.log("found: ", entity);
              
                  if (!entity) {
                    console.warn(`Không tìm thấy entity với id: ${entityId}`);
                    return;
                  }
              
                  const functionName = step.action.name;
                  const functionParameter = step.action.data;
              
                  ReflectionUtil.callFunctionSmart(entity, functionName, functionParameter);
                });
              });
        });
    }
}
