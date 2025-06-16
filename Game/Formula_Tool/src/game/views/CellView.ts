import CellDTO from "../dtos/CellDTO";
import EdgeDTO from "../dtos/EdgeDTO";
import PointDTO from "../dtos/PointDTO";
import EdgeView from "./EdgeView";
import LabelView from "./LabelView";
import { GridColors } from "../enums/GridColors";
import LabelDTO from "../dtos/LabelDTO";
import DrawableForCell from "../interfaces/Drawable";
import Fillable from "../interfaces/Fillable";
import { TimeLineValues } from "../utils/TimeLine";
const numberOfEdge = 4;
const colorValues = [
    0x000000, 0x0000ff, 0x00ff00, 0xff0000, 0xffff00, 0xff00ff, 0x00ffff,
    0xffffff,
];

export default class CellView
    extends Phaser.GameObjects.Container
    implements DrawableForCell, Fillable
{
    private _cell: CellDTO;
    constructor(scene: Phaser.Scene, cell: CellDTO) {
        super(scene);
        this._cell = cell;
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
        x: number,
        y: number,
        w: number,
        h: number,
        color: number,
        duration: number = 1000
    ): void {
        // Tạo rectangle với origin tại giữa
        const rect = this.scene.add
            .rectangle(x + w / 2, y + h / 2, w, h, color, 1)
            .setOrigin(0.5, 0.5)
            .setScale(0, 0);

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
        startX: number,
        startY: number,
        height: number,
        width: number,
        ratioCols: number[],
        ratioRows: number[]
    ) {
        const topEdge = new EdgeDTO(
            new PointDTO(startX, startY),
            new PointDTO(startX + width, startY)
        );
        const edgeView = new EdgeView(this.scene, topEdge, GridColors.PINK);
        edgeView.splitEdge(ratioCols, TimeLineValues.firstLine.drawTime);

        const leftEdge = new EdgeDTO(
            new PointDTO(startX, startY),
            new PointDTO(startX + width, startY)
        );
        const edgeView2 = new EdgeView(this.scene, leftEdge, GridColors.PINK);

        const bottomEdgeRotate1 = new EdgeDTO(
            new PointDTO(startX, startY),
            new PointDTO(startX, startY + height)
        );
        const edgeView3 = new EdgeView(
            this.scene,
            bottomEdgeRotate1,
            GridColors.PINK
        );

        const bottomEdgeRotate2 = new EdgeDTO(
            new PointDTO(startX, startY + height),
            new PointDTO(startX + width, startY + height)
        );
        const edgeView4 = new EdgeView(
            this.scene,
            bottomEdgeRotate2,
            GridColors.PINK
        );

        const rightEdge = new EdgeDTO(
            new PointDTO(startX, startY + height),
            new PointDTO(startX + width, startY + height)
        );
        const edgeView5 = new EdgeView(this.scene, rightEdge, GridColors.PINK);

        // Tính toán cho việc tô màu ô
        const topSegments = topEdge.split(ratioCols); // mảng các đoạn ngang
        const leftSegments = bottomEdgeRotate1.split(ratioRows); // mảng các đoạn dọc
        const nCols = topSegments.length;
        const nRows = leftSegments.length;

        this.scene.time.delayedCall(TimeLineValues.secondLine.startTime, () => {
            edgeView2.splitEdge(ratioRows, TimeLineValues.secondLine.drawTime);
            edgeView2.rotateStart(90);
        });
        this.scene.time.delayedCall(TimeLineValues.thirdLine.startTime, () => {
            edgeView3.splitEdge(ratioRows, TimeLineValues.thirdLine.drawTime);
            edgeView3.rotateEnd(90);
        });
        this.scene.time.delayedCall(
            TimeLineValues.thirdLine.startSecondLineTime,
            () => {
                edgeView3.setVisible(false);
                edgeView4.splitEdge(
                    ratioRows,
                    TimeLineValues.fourthLine.drawTime
                );
                edgeView4.rotateCenter(360);
            }
        );
        this.scene.time.delayedCall(TimeLineValues.fourthLine.startTime, () => {
            edgeView5.splitEdge(ratioRows, TimeLineValues.fourthLine.drawTime);
            edgeView5.rotateEnd(90);
        });
        this.scene.time.delayedCall(
            TimeLineValues.drawColsGrid.startTime,
            () => {
                const length = topSegments.length;
                const timeEach = TimeLineValues.drawColsGrid.drawTime / length;
                topSegments.forEach((edge, index) => {
                    this.scene.time.delayedCall(timeEach * index, () => {
                        const startPoint = new PointDTO(
                            edge.start.x,
                            edge.start.y
                        );
                        const endPoint = new PointDTO(
                            edge.start.x,
                            edge.start.y + height
                        );
                        const edgeData = new EdgeDTO(startPoint, endPoint);
                        const edgeView = new EdgeView(
                            this.scene,
                            edgeData,
                            GridColors.GREEN
                        );
                        edgeView.splitEdge(
                            ratioCols,
                            TimeLineValues.drawColsGrid.drawTime
                        );
                    });
                });
            }
        );
        this.scene.time.delayedCall(
            TimeLineValues.drawRowsGrid.startTime,
            () => {
                const length = leftSegments.length;
                const timeEach = TimeLineValues.drawRowsGrid.drawTime / length;
                leftSegments.forEach((edge, index) => {
                    this.scene.time.delayedCall(timeEach * index, () => {
                        const startPoint = new PointDTO(
                            edge.start.x,
                            edge.start.y
                        );
                        const endPoint = new PointDTO(
                            edge.start.x + width,
                            edge.start.y
                        );
                        const edgeData = new EdgeDTO(startPoint, endPoint);
                        const edgeView = new EdgeView(
                            this.scene,
                            edgeData,
                            GridColors.GREEN
                        );
                        edgeView.splitEdge(
                            ratioRows,
                            TimeLineValues.drawRowsGrid.drawTime
                        );
                    });
                });
            }
        );
        this.scene.time.delayedCall(TimeLineValues.fillCell.startTime, () => {
            topSegments.forEach((segH, col) => {
                leftSegments.forEach((segV, row) => {
                    const delay = 100 * (row * nCols + col);
                    this.scene.time.delayedCall(delay, () => {
                        const x = segH.start.x;
                        const y = segV.start.y;
                        const width = segH.end.x - segH.start.x;
                        const height = segV.end.y - segV.start.y;
                        const color =
                            colorValues[
                                ((row + 1) * (col + 1)) % colorValues.length
                            ];
                        this.fill(
                            x,
                            y,
                            width,
                            height,
                            color,
                            TimeLineValues.fillCell.drawTime
                        );
                    });
                });
            });
        });
    }
}
