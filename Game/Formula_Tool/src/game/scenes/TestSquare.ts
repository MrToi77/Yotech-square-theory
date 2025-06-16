import Phaser from "phaser";
import TestSquareDeclare from "../declares/TestSquareDeclare";
import GridController from "../controllers/GridController";
import PointDTO from "../dtos/PointDTO";
import CellDTO from "../dtos/CellDTO";
import CellView from "../views/CellView";

export default class SquareGridScene extends Phaser.Scene {
    private declare: TestSquareDeclare;
    private GridController: GridController;
    public data: any;
    constructor() {
        super({ key: "SquareGridScene" });
    }

    init(data: any): void {
        this.data = data;
    }

    create(): void {
        const cellData = new CellDTO(new PointDTO(150, 60), new PointDTO(700, 60), new PointDTO(150, 610), new PointDTO(700, 610));
        const cellView = new CellView(this, cellData);
        cellView.draw(cellData.tl.x, cellData.tl.y, cellData.h, cellData.w , [0.5, 0.3, 0.2], [0.5, 0.3, 0.2]);
        this.add.existing(cellView);
    }
}
