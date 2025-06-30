import CellDTO from "../dtos/CellDTO";
import EdgeDTO from "../dtos/EdgeDTO";
import PointDTO from "../dtos/PointDTO";
import EdgeView from "./EdgeView";
import LabelView from "./LabelView";
import { GridColors } from "../enums/GridColors";
import LabelDTO from "../dtos/LabelDTO";
import Drawable from "../interfaces/Drawable";
import Fillable from "../interfaces/Fillable";
import { TimeLineValues } from "../utils/TimeLine";
import Rotatable from "../interfaces/Rotatable";
import { BaseView } from "./BaseView";
import Split from "../interfaces/Split";
const colorValues = Object.values(GridColors).filter(
    (v) => typeof v === "number"
) as number[];

export default class CellView extends BaseView implements Drawable, Fillable, Rotatable, Split {
    private cell: CellDTO;
    public topEdgeView!: EdgeView;
    public bottomEdgeView!: EdgeView;
    public leftEdgeView!: EdgeView;
    public rightEdgeView!: EdgeView;
    constructor(scene: Phaser.Scene, cell: CellDTO) {
        super(scene);
        this.cell = cell;
    }

    /**
     * Vẽ một ô được tô đặc, scale dần từ tâm ra ngoài.
     * @param x      – toạ độ trái trên của ô (world coords)
     * @param y      – toạ độ trái trên của ô
     * @param w      – chiều rộng ô
     * @param h      – chiều cao ô
     * @param color  – mã màu 0xRRGGBB
     * @param duration – thời gian (ms) cho animation scale (mặc định 1000ms)
     */
    public fill(
        color: number,
        duration: number = 1000
    ): void {
        // Tạo rectangle với origin tại giữa
        const rect = this.scene.add
            .rectangle(this.cell.center.x, this.cell.center.y , this.cell.w, this.cell.h, color, 1)
            .setOrigin(0.5, 0.5)
            .setScale(0, 0).setDepth(0);

        // Tween scale từ 0 → 1
        this.scene.tweens.add({
            targets: rect,
            scaleX: 1,
            scaleY: 1,
            duration,
            ease: "Linear",
        });
    }

    public draw(
        color: number,
        duration: number
    ) {
        this.drawTopEdge(color, duration);
        this.drawBottomEdge(color, duration);
        this.drawLeftEdge(color, duration);
        this.drawRightEdge(color, duration);
    }

    private drawTopEdge(color: number, duration: number) {
        this.topEdgeView = new EdgeView(this.scene, this.cell.topEdge, color);
        this.topEdgeView.draw(color, duration);
        this.add(this.topEdgeView);
    }

    private drawBottomEdge(color: number, duration: number) {
        this.bottomEdgeView = new EdgeView(this.scene, this.cell.bottomEdge, color);
        this.bottomEdgeView.draw(color, duration);
        this.add(this.bottomEdgeView);
    }

    private drawLeftEdge(color: number, duration: number) {
        this.leftEdgeView = new EdgeView(this.scene, this.cell.leftEdge, color);
        this.leftEdgeView.draw(color, duration);
        this.add(this.leftEdgeView);
    }
    
    private drawRightEdge(color: number, duration: number) {
        this.rightEdgeView = new EdgeView(this.scene, this.cell.rightEdge, color);
        this.rightEdgeView.draw(color, duration);
        this.add(this.rightEdgeView);
    }

    public rotateOld() {
    }

    public split(ratios: number[]): CellView[] {
        const cellSplittedData = this.cell.split(ratios);
        const cellViews: CellView[] = [];
        cellSplittedData.forEach((cell, index) => {
            const cellView = new CellView(this.scene, cell);
            this.add(cellView);
            cellViews.push(cellView);
        });
        return cellViews;
    }
}
