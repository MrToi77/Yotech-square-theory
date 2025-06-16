import Phaser from "phaser";
import EdgeDTO from "../dtos/EdgeDTO";
import PointDTO from "../dtos/PointDTO";
import { GridColors } from "../enums/GridColors";
import PointView from "./PointView";

// Lấy mảng chỉ gồm giá trị màu (số) từ enum
const colorValues = Object.values(GridColors).filter(
    (v) => typeof v === "number"
) as number[];

export default class EdgeView extends Phaser.GameObjects.Container {
    private edge: EdgeDTO;
    public phaserEdge!: Phaser.GameObjects.Line;
    private duration: number;
    public angle: number = 0;
    private pivotContainer?: Phaser.GameObjects.Container;

    constructor(
        scene: Phaser.Scene,
        edge: EdgeDTO,
        color: number = colorValues[0],
        duration: number = 0
    ) {
        // Container tại điểm bắt đầu cạnh gốc
        super(scene, edge.start.x, edge.start.y);
        scene.add.existing(this);

        this.edge = edge;
        this.edge.color = color;
        this.duration = duration;
    }

    /** Vẽ một cạnh trong container này với màu truyền vào */
    public createEdge(
        startPoint: PointDTO,
        endPoint: PointDTO,
        color: number
    ): void {
        // Tính delta
        const dx = endPoint.x - startPoint.x;
        const dy = endPoint.y - startPoint.y;

        // Tạo line ở toạ độ (0,0) của container
        const line = this.scene.add
            .line(0, 0, 0, 0, dx, dy, color)
            .setOrigin(0)
            .setLineWidth(4);

        // Thêm vào container
        this.add(line);
        this.phaserEdge = line;

        // Animate vẽ dần
        this.animDra(this.duration);
    }

    /** Animate vẽ từ 0 → full; onComplete tùy chọn */
    private animDra(duration: number = 1000): void {
        const line = this.phaserEdge;
        const geom = line.geom as Phaser.Geom.Line;
        const fullX2 = geom.x2;
        const fullY2 = geom.y2;

        // Reset độ dài
        line.setTo(0, 0, 0, 0);

        this.scene.tweens.addCounter({
            from: 0,
            to: 1,
            duration,
            ease: "Linear",
            onUpdate: (tween) => {
                const t = tween.getValue() as number;
                if (!line.active) {
                    tween.stop();
                    return;
                }
                line.setTo(0, 0, fullX2 * t, fullY2 * t);
            },
        });
    }

    /**
     * Tách và vẽ các đoạn con (thay thế cạnh gốc) ngay lập tức
     */
    public splitEdge(ratios: number[], totalTime: number): void {
        // Xóa cạnh gốc nếu có
        if (this.phaserEdge) {
            this.phaserEdge.destroy();
        }
        // Xóa các children cũ (bao gồm line gốc)
        this.removeAll(true);

        // Tách thành EdgeDTO[]
        const parts = this.edge.split(ratios);
        const perDuration = totalTime / parts.length;

        // Vẽ từng segment dưới dạng EdgeView con
        parts.forEach((segment, idx) => {
            const color = colorValues[idx % colorValues.length];
            setTimeout(() => {
                const ev = new EdgeView(
                    this.scene,
                    segment,
                    color,
                    perDuration
                );

                ev.createEdge(segment.start, segment.end, color);
                // Offset relative đến điểm start gốc
                const dx = segment.start.x - this.edge.start.x;
                const dy = segment.start.y - this.edge.start.y;
                ev.setPosition(dx, dy);

                // Thêm vào container hiện tại
                this.add(ev);
            }, perDuration * idx);
        });
    }

    /**
     * Destroy phaserEdge (dừng tween & xoá line)
     */
    public desEdge(): void {
        if (this.phaserEdge?.active) {
            this.scene.tweens.killTweensOf(this.phaserEdge);
            this.phaserEdge.destroy();
        }
    }

    private rotate(
        angle: number,
        pivotX: number,
        pivotY: number,
        duration: number = 1000
    ): void {
        // Tạo hoặc tái sử dụng pivotContainer
        if (!this.pivotContainer) {
            const worldPivotX = this.x + pivotX;
            const worldPivotY = this.y + pivotY;
            this.pivotContainer = this.scene.add.container(
                worldPivotX,
                worldPivotY
            );
            this.pivotContainer.add(this);
            this.setPosition(-pivotX, -pivotY);
        }
        // Tween xoay pivotContainer tương đối
        this.scene.tweens.add({
            targets: this.pivotContainer,
            angle: `+=${angle}`,
            duration,
            ease: "Linear",
        });
    }

    public rotateStart(angle: number) {
        const pivotX = 0;
        const pivotY = 0;
        this.rotate(angle, pivotX, pivotY);
    }

    public rotateEnd(angle: number) {
        const dx = this.edge.end.x - this.edge.start.x;
        const dy = this.edge.end.y - this.edge.start.y;
        this.rotate(angle, dx, dy);
    }

    public rotateCenter(angle: number) {
        const dx = this.edge.end.x - this.edge.start.x;
        const dy = this.edge.end.y - this.edge.start.y;
        const pivotX = dx / 2;
        const pivotY = dy / 2;
        this.rotate(angle, pivotX, pivotY);
    }
}
