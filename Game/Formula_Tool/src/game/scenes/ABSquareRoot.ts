
import PointDTO from "../dtos/PointDTO";
import CellDTO from "../dtos/CellDTO";
import CellView from "../views/CellView";
import EdgeDTO from "../dtos/EdgeDTO";
import EdgeView from "../views/EdgeView";
import { GridColors } from "../enums/GridColors";

export default class ABSquareRoot extends Phaser.Scene {
    constructor() {
        super({ key: "SquareGridScene" });
    }

    init(data: any): void {
    }

    create(): void {
        let data = {
            Length: 500,
            Ratios: [0.4, 0.6],
            durationForEachAnim: 1000,
        };

        let culTime = 0;


        // Lấy mảng chỉ gồm giá trị màu (số) từ enum
        const colorValues = Object.values(GridColors).filter(
            (v) => typeof v === "number"
        ) as number[];

        let perviousEdge: EdgeDTO | null = null;

        const WX = (this.scale.width - data.Length) / 2;
        const WY = (this.scale.height - data.Length) / 2;

        const cellData = new CellDTO(new PointDTO(WX, WY), new PointDTO(WX + data.Length, WY), new PointDTO(WX, WY + data.Length), new PointDTO(WX + data.Length, WY + data.Length));

        const TopEdgeData = new EdgeDTO(cellData.tl, cellData.tr);
        const TopSplitData = TopEdgeData.split(data.Ratios);

        const RightEdgeData = new EdgeDTO(cellData.tr, cellData.br);
        const RightSplitData = RightEdgeData.split(data.Ratios);


        TopSplitData.forEach((edge, index) => {
            if (index === 0) {const edgeView = new EdgeView(this, edge);
                this.add.existing(edgeView);
                edgeView.draw(colorValues[index % colorValues.length], data.durationForEachAnim);
            } else {
                // Đảo hướng edge
                const t = 1 - edge.length / perviousEdge!.length;
                edge.end.x = perviousEdge!.start.x + t * (perviousEdge!.end.x - perviousEdge!.start.x);
                edge.end.y = perviousEdge!.start.y + t * (perviousEdge!.end.y - perviousEdge!.start.y);
                const edgeView = new EdgeView(this, edge);
                this.add.existing(edgeView);
                this.time.delayedCall(culTime, () => {
                    culTime += data.durationForEachAnim;
                    edgeView.draw(colorValues[index % colorValues.length], 0);
                    edgeView.rotateStart(-180);
                });
            }
            culTime += data.durationForEachAnim;
            perviousEdge = edge;
        });

        // Left Edge

        const leftEdgeView = new EdgeView(this, TopEdgeData);
        this.add.existing(leftEdgeView);
        this.time.delayedCall(culTime, () => {
            leftEdgeView.NoAnimationSplitEdge(data.Ratios);
            leftEdgeView.rotateStart(90);
        });
        culTime += data.durationForEachAnim;

        // Rotate bottom edge fist time
        const bottomEdgeViewRotate1 = new EdgeView(this, new EdgeDTO(cellData.tl, cellData.bl));
        this.add.existing(bottomEdgeViewRotate1);
        this.time.delayedCall(culTime, () => {
            bottomEdgeViewRotate1.NoAnimationSplitEdge(data.Ratios);
            bottomEdgeViewRotate1.rotateEnd(90);
        });
        culTime += data.durationForEachAnim;

        // Rotate bottom edge second time
        const bottomEdgeViewRotate2 = new EdgeView(this, new EdgeDTO(cellData.bl, cellData.br));
        this.add.existing(bottomEdgeViewRotate2);
        this.time.delayedCall(culTime, () => {
            bottomEdgeViewRotate1.destroy();
            bottomEdgeViewRotate2.NoAnimationSplitEdge(data.Ratios);
            bottomEdgeViewRotate2.rotateCenter(360);
        });
        culTime += data.durationForEachAnim;
        
        const rightEdgeView = new EdgeView(this, new EdgeDTO(cellData.bl, cellData.br));
        this.add.existing(rightEdgeView);
        this.time.delayedCall(culTime, () => {
            rightEdgeView.NoAnimationSplitEdge(data.Ratios);
            rightEdgeView.rotateEnd(90);
        });
        culTime += data.durationForEachAnim;

        // Cell
        // A01
        const A01A = new EdgeView(this, TopSplitData[0]);
        this.add.existing(A01A);
        this.time.delayedCall(culTime, () => {
            A01A.draw(colorValues[0 % colorValues.length], 0);
            A01A.rotateEnd(-90);
        });
        culTime += data.durationForEachAnim;

        // Sao chép A01A
        const A01AEnd = TopSplitData[0].end;
        const A01BStart = new PointDTO(A01AEnd.x, A01AEnd.y);
        const A01BEnd = new PointDTO(A01AEnd.x, A01AEnd.y + TopSplitData[0].length);

        const A01BData = new EdgeDTO(A01BStart, A01BEnd);

        // Vẽ cạnh A01 thứ 2
        const A01B = new EdgeView(this, A01BData);
        this.add.existing(A01B);
        this.time.delayedCall(culTime, () => {
            A01B.draw(colorValues[0 % colorValues.length], 0);
            A01B.rotateEnd(-90);
        });
        culTime += data.durationForEachAnim;

        // A04

        // A04A
        const A04A = new EdgeView(this, RightSplitData[1]);
        this.add.existing(A04A);
        this.time.delayedCall(culTime, () => {
            A04A.draw(colorValues[1 % colorValues.length], 0);
            A04A.rotateStart(90);
        });
        culTime += data.durationForEachAnim;

        // A04B
        const A04AStart = RightSplitData[1].start;
        const A04BStart = new PointDTO(A04AStart.x, A04AStart.y);
        const A04BEnd = new PointDTO(A04AStart.x - RightSplitData[1].length, A04AStart.y);

        const A04BData = new EdgeDTO(A04BStart, A04BEnd);

        const A04B = new EdgeView(this, A04BData);
        this.add.existing(A04B);
        this.time.delayedCall(culTime, () => {
            A04B.draw(colorValues[1 % colorValues.length], 0);
            A04B.rotateEnd(90);
        });
        culTime += data.durationForEachAnim;
        
        // Fill Cell
        const cellView = new CellView(this, cellData);
        this.add.existing(cellView);
        this.time.delayedCall(culTime, () => {
            cellView.split(data.Ratios);
        });
        culTime += data.durationForEachAnim;
    }
}
