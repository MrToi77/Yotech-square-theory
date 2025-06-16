import PointDTO from "./PointDTO";
import { EdgeType } from "../enums/EdgeType";
import { Constants } from "../utils/Constants";
export default class EdgeDTO {
    public start: PointDTO;
    public end: PointDTO;
    public length: number;
    public center: PointDTO;
    public color: number;

    constructor(
        start: PointDTO,
        end: PointDTO,
        color: number = Constants.DEFAULT_COLOR
    ) {
        this.start = start;
        this.end = end;
        this.length = Phaser.Math.Distance.BetweenPoints(start, end);
        this.center = new PointDTO(
            (start.x + end.x) / 2,
            (start.y + end.y) / 2
        );
        this.color = color;
    }

    public splitEqual(amount: number, type: EdgeType): EdgeDTO[] {
        const ratios = [];
        for (let i = 0; i <= amount; i++) {
            ratios.push(i / amount);
        }
        return this.split(ratios);
    }

    public split(ratios: number[]): EdgeDTO[] {
        // 1. Tính tổng weights
        const sum = 1;
      
        // 2. Xây mảng các tham số t (cumulative)
        //    bắt đầu từ 0, rồi lần lượt cộng dồn từng weight và chia cho tổng
        const ts: number[] = [0];
        let acc = 0;
        for (const r of ratios) {
          acc += r;
          ts.push(acc / sum);
        }
        // đảm bảo luôn có t = 1 ở cuối
        if (ts[ts.length - 1] < 1) {
          ts.push(1);
        }
      
        // 3. Từ mảng t, tạo ra từng đoạn con
        const segments: EdgeDTO[] = [];
        for (let i = 0; i < ts.length - 1; i++) {
          const p1 = this.getPointAlongEdge(ts[i]);
          const p2 = this.getPointAlongEdge(ts[i + 1]);
          segments.push(new EdgeDTO(p1, p2));
        }
        return segments;
      }

    private getPointAlongEdge(ratio: number): PointDTO {
        // get point along edge by ratio
        const x = this.start.x + ratio * (this.end.x - this.start.x);
        const y = this.start.y + ratio * (this.end.y - this.start.y);
        const point = new PointDTO(x, y);
        return point;
    }
}
