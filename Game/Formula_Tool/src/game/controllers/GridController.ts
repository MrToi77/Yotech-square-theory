import Phaser from 'phaser';
import TestSquareDeclare from "../declares/TestSquareDeclare";

import PointDTO from '../dtos/PointDTO';
import GridView from '../views/GridView';

export default class GridController {
  private scene: Phaser.Scene;
  private declare: TestSquareDeclare;

  constructor(scene: Phaser.Scene, declare: TestSquareDeclare) {
    this.scene = scene;
    this.declare = declare;
  }

  // public drawLindGrid() {
  //   this.declare.mode = 'line';
  //   this.redraw();
  // }

  public redraw() {
    if (this.declare.currentGrid) {
      this.declare.currentGrid.destroyGrid();
    }
    // 1. Destroy previous cells
    this.declare.cells.forEach(row => row.forEach(cell => cell.destroy()));
    this.declare.cells = [];

    // // 2. Destroy previous X/Y labels
    // this.declare.xLabels.forEach(t => t.destroyLabel());
    // this.declare.xLabels = [];

    // this.declare.yLabels.forEach(t => t.destroyLabel());
    // this.declare.yLabels = [];

    // 3. Destroy previous areaText (nếu có)
    this.declare.areaText?.destroy();
    this.declare.areaText = undefined;

    // 5. Clear graphics (gán ở create bằng this.declare.graphics = this.graphics)
    this.declare.graphics.clear();

    // 6. Tính kích thước căn bản
    const W = this.scene.scale.width;
    const H = this.scene.scale.height;
    const side = Math.min(W, H) - this.declare.padding * 2;
    const cx = (W - side) / 2;
    const cy = (H - side) / 2;

    // 7. Vẽ border vuông
    // this.declare.graphics.lineStyle(2, 0x333333).strokeRect(cx, cy, side, side);

    // 8. Tính raw sizes
    const rawW = this.declare.weightsX.map(w => w * side);
    const rawH = this.declare.weightsY.map(w => w * side);

    // 9. Tạo dựng cumX, cumY
    const cumX: number[] = [0];
    rawW.forEach((w, i) => cumX.push(cumX[i] + w));
    const cumY: number[] = [0];
    rawH.forEach((h, i) => cumY.push(cumY[i] + h));

    // 10. Gọi service vẽ grid lines, labels và các ô
    // this.service.redrawService(cumX, cumY, cx, cy, side, rawW, rawH);
    this.declare.currentGrid = new GridView(this.scene, new PointDTO(cx, cy), side, side, this.declare.weightsX, this.declare.weightsY);
    this.declare.currentGrid.destroyGrid()
  }

}
