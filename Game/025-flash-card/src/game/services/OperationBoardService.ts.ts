import OperationBoardView from "../views/OperationBoard";
import OperationBoardDTO from "../DTOs/OperationBoardDTO";
import BaseService from "../mct_common/BaseService";
export default class OperationBoardService extends BaseService<OperationBoardDTO>{
  private data: OperationBoardDTO;
  private operationBoardView: OperationBoardView;
  constructor(scene: Phaser.Scene, jsonPath: string, data: OperationBoardDTO){
    super(scene, jsonPath);
    this.data = data;
    this.getView();
  }

  public getView(){
    this.operationBoardView = new OperationBoardView(this.scene, this.data);
    this.scene.add.existing(this.operationBoardView);
  }

}