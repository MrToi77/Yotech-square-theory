import PointDTO from "./PointDTO";
import { EdgeType } from "../enums/EdgeType";
import { Constants } from "../utils/Constants";
export default class EdgeDTO {
    public start: PointDTO;
    public end: PointDTO;
    public length: number;
    public center: PointDTO;
    public color: number;
    public ratios: number[];

    constructor(
        start: PointDTO,
        end: PointDTO,
        ratios: number[] = [1],
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
        this.ratios = ratios
    }

    public findPointByRatio(ratio: number): PointDTO{
      const x = this.start.x + ratio * (this.end.x - this.start.x);
      const y = this.start.y + ratio * (this.end.y - this.start.y);
      return new PointDTO(x, y);
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
      const sum = ratios.reduce((a, b) => a + b, 0);
      if (sum === 0) {
        // Nếu ratios toàn 0, trả về nguyên cạnh gốc
        return [new EdgeDTO(this.start, this.end)];
      }
    
      // 2. Tạo mảng t từ 0 đến 1
      const ts: number[] = [0];
      let acc = 0;
      for (const r of ratios) {
        acc += r;
        ts.push(acc / sum);
      }
      // Nếu cuối chưa có 1, thêm vào
      if (ts[ts.length - 1] < 1) {
        ts.push(1);
      }
    
      // 3. Vẽ segments
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
