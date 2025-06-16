import PointDTO from "./PointDTO";
import { Constants } from "../utils/Constants";
import { EdgeType } from "../enums/EdgeType";

export default class CellDTO {
    public tl: PointDTO;
    public tr: PointDTO;
    public bl: PointDTO;
    public br: PointDTO;
    public center: PointDTO;
    public w: number;
    public h: number;
    public color: number;

    constructor(topLeft: PointDTO, topRight: PointDTO, bottomLeft: PointDTO, bottomRight: PointDTO, color: number = Constants.DEFAULT_COLOR) {
        this.tl = topLeft;
        this.tr = topRight;
        this.bl = bottomLeft;
        this.br = bottomRight;
        this.center = new PointDTO((topLeft.x + topRight.x + bottomLeft.x + bottomRight.x) / 4, (topLeft.y + topRight.y + bottomLeft.y + bottomRight.y) / 4);
        this.w = topRight.x - topLeft.x;
        this.h = bottomLeft.y - topLeft.y;
        this.color = color;
    }

    public splitEqual(rows: number, cols: number): CellDTO[] {
        const rowsRatios = [];
        const colsRatios = [];
        for (let i = 0; i < rows; i++) {
            rowsRatios.push(i / rows);
        }
        for (let i = 0; i < cols; i++) {
            colsRatios.push(i / cols);
        }
        return this.split(rowsRatios, colsRatios);
    }
    public split(rows: number[], cols: number[]): CellDTO[] {
        const cells: CellDTO[] = [];
      
        // 1) Chuẩn hoá weights → absolute heights & widths
        const sumRows = rows.reduce((sum, r) => sum + r, 0);
        const sumCols = cols.reduce((sum, c) => sum + c, 0);
      
        const heights = rows.map(r => this.h * r / sumRows);
        const widths  = cols.map(c => this.w * c / sumCols);
      
        // 2) Tính cumulative offsets
        const yOffsets = heights.reduce<number[]>((acc, h) => {
          acc.push(acc[acc.length - 1] + h);
          return acc;
        }, [0]);
      
        const xOffsets = widths.reduce<number[]>((acc, w) => {
          acc.push(acc[acc.length - 1] + w);
          return acc;
        }, [0]);
      
        // 3) Duyệt qua từng ô con
        for (let r = 0; r < rows.length; r++) {
          for (let c = 0; c < cols.length; c++) {
            const ox = xOffsets[c];
            const oy = yOffsets[r];
            const w  = widths[c];
            const h  = heights[r];
      
            const topLeft     = new PointDTO(this.tl.x + ox,     this.tl.y + oy);
            const topRight    = new PointDTO(this.tl.x + ox + w, this.tl.y + oy);
            const bottomLeft  = new PointDTO(this.tl.x + ox,     this.tl.y + oy + h);
            const bottomRight = new PointDTO(this.tl.x + ox + w, this.tl.y + oy + h);
      
            cells.push(new CellDTO(topLeft, topRight, bottomLeft, bottomRight, this.color));
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