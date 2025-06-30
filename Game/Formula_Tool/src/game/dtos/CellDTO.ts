import PointDTO from "./PointDTO";
import { Constants } from "../utils/Constants";
import { EdgeType } from "../enums/EdgeType";
import EdgeDTO from "./EdgeDTO";

export interface Index {
    row: number;
    col: number;
}
export default class CellDTO {
    public tl: PointDTO;
    public tr: PointDTO;
    public bl: PointDTO;
    public br: PointDTO;
    public center: PointDTO;
    public topEdge: EdgeDTO;
    public bottomEdge: EdgeDTO;
    public leftEdge: EdgeDTO;
    public rightEdge: EdgeDTO;
    public w: number;
    public h: number;
    public color: number;
    public index: Index;
    constructor(topLeft: PointDTO, topRight: PointDTO, bottomLeft: PointDTO, bottomRight: PointDTO, color: number = Constants.DEFAULT_COLOR, index: Index = {row: 0, col: 0}) {
        this.tl = topLeft;
        this.tr = topRight;
        this.bl = bottomLeft;
        this.br = bottomRight;
        this.center = new PointDTO((topLeft.x + topRight.x + bottomLeft.x + bottomRight.x) / 4, (topLeft.y + topRight.y + bottomLeft.y + bottomRight.y) / 4);

        this.topEdge = new EdgeDTO(topLeft, topRight);
        this.bottomEdge = new EdgeDTO(bottomLeft, bottomRight);
        this.leftEdge = new EdgeDTO(topLeft, bottomLeft);
        this.rightEdge = new EdgeDTO(topRight, bottomRight);
        
        this.w = topRight.x - topLeft.x;
        this.h = bottomLeft.y - topLeft.y;
        this.color = color;
        this.index = index;
    }

    public splitEqual(rows: number): CellDTO[] {
        const rowsRatios = [];
        for (let i = 0; i < rows; i++) {
            rowsRatios.push(i / rows);
        }
        return this.split(rowsRatios);
    }
    public split(ratios: number[]): CellDTO[] {
      const cells: CellDTO[] = [];
  
      // 1) Tổng tỉ lệ để chuẩn hoá
      const sum = ratios.reduce((sum, r) => sum + r, 0);
  
      // 2) Tính chiều dài và offset
      const sizes = ratios.map(r => (this.w * r) / sum); // hoặc this.h, vì là hình vuông
      const offsets = sizes.reduce<number[]>((acc, size) => {
          acc.push(acc[acc.length - 1] + size);
          return acc;
      }, [0]);
  
      // 3) Duyệt qua từng hàng và cột
      for (let r = 0; r < ratios.length; r++) {
          for (let c = 0; c < ratios.length; c++) {
              const ox = offsets[c];
              const oy = offsets[r];
              const w = sizes[c];
              const h = sizes[r];
  
              const topLeft     = new PointDTO(this.tl.x + ox,     this.tl.y + oy);
              const topRight    = new PointDTO(this.tl.x + ox + w, this.tl.y + oy);
              const bottomLeft  = new PointDTO(this.tl.x + ox,     this.tl.y + oy + h);
              const bottomRight = new PointDTO(this.tl.x + ox + w, this.tl.y + oy + h);

              const indexObj = {row: r, col: c};
  
              cells.push(new CellDTO(topLeft, topRight, bottomLeft, bottomRight, this.color, indexObj));
          }
      }
  
      return cells;
  }
  
      
    public fillCellColor(pointStart: EdgeType ) {
        const startX = pointStart === "top" ? this.center.x: pointStart === "bottom" ? this.center.x : pointStart === "left" ? this.center.y : this.center.y;
        const startY = pointStart === "top" ? this.tl.y : pointStart === "bottom" ? this.bl.y : pointStart === "left" ? this.tl.y : this.tr.y;
        const width = this.w;
        const height = this.h;
        return {startX, startY, width, height};
    }
}