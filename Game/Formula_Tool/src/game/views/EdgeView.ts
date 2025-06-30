import Phaser from "phaser";
import EdgeDTO from "../dtos/EdgeDTO";
import PointDTO from "../dtos/PointDTO";
import { GridColors } from "../enums/GridColors";
import PointView from "./PointView";
import { BaseView } from "./BaseView";

// Lấy mảng chỉ gồm giá trị màu (số) từ enum
const colorValues = Object.values(GridColors).filter(
    (v) => typeof v === "number"
) as number[];

export default class EdgeView extends BaseView {
    public edge: EdgeDTO;
    public phaserEdge!: Phaser.GameObjects.Line;
    public angle: number = 0;
    private pivotContainer?: Phaser.GameObjects.Container;

    constructor(
        scene: Phaser.Scene,
        edge: EdgeDTO,
        color: number = colorValues[0]
    ) {
        super(scene);
        scene.add.existing(this);
        this.edge = edge;
        this.edge.color = color;
        console.log("EdgeView constructed, this.scene:", this.scene);
    }

    public draw(color: number): void {
      this.setPosition(this.edge.start.x, this.edge.start.y);
      console.log("this.scene in draw: ", this.scene); // ✅ Phải là Scene object
      this.phaserEdge = this.scene.add
          .line(
              0, 0, 
              0, 0,
              this.edge.end.x - this.edge.start.x,
              this.edge.end.y - this.edge.start.y,
              color
          )
          .setOrigin(0)
          .setLineWidth(4);
      this.add(this.phaserEdge);
  }

    public fill(color: number, duration: number): void {
        console.log("Do not fill the edge");
    }

    public rotate(axisPoint: number, angle: number, duration = 1000) {
      const pivot = this.edge.findPointByRatio(axisPoint);
      if (!this.pivotContainer) {
        this.pivotContainer = this.scene.add.container(pivot.x, pivot.y);
        this.pivotContainer.add(this);
        this.setPosition(this.x - pivot.x, this.y - pivot.y);
    }

    this.scene.tweens.add({
        targets: this.pivotContainer,
        angle: `+=${angle}`,
        duration,
        ease: "Linear",
    });
    }
  
    /** Animate vẽ từ 0 → full; onComplete tùy chọn */
    private doAnimation(duration: number = 1000): void {
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

    public move(
        x: number,
        y: number,
        duration: number,
        pivot?: PointDTO
      ): void {
        let target: Phaser.GameObjects.Container | this = this;
    
        if (pivot) {
          if (!this.pivotContainer) {
            this.pivotContainer = this.scene.add.container(pivot.x, pivot.y);
            this.pivotContainer.add(this);
            this.setPosition(this.x - pivot.x, this.y - pivot.y);
          }
          target = this.pivotContainer;
        }
    
        this.scene.tweens.add({
          targets: target,
          x,
          y,
          duration,
          ease: "Linear",
        });
      }
    
      /** Chuyển sao cho START của đoạn tới (x,y), không dùng pivot */
      public moveStart(
        x: number,
        y: number,
        duration: number = 1000
      ): void {
        this.move(x, y, duration);
      }
    
      /** Chuyển sao cho CENTER của đoạn tới (x,y) */
      public moveCenter(
        x: number,
        y: number,
        duration: number = 1000
      ): void {
        this.move(x, y, duration, this.edge.center);
      }
    
      /** Chuyển sao cho END của đoạn tới (x,y) */
      public moveEnd(
        x: number,
        y: number,
        duration: number = 1000
      ): void {
        const offsetX = this.edge.end.x - this.edge.start.x;
        const offsetY = this.edge.end.y - this.edge.start.y;
        this.move(x - offsetX, y - offsetY, duration);
      }
    }      
