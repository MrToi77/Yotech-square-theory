import PointDTO from "../dtos/PointDTO";

export default class GridDeclare {
    public startPoint: PointDTO = new PointDTO(100, 60);
    public width: number = 300;
    public height: number = 300;
    public rows: number = 2;
    public cols: number = 2;
}