import { BaseView } from "mct-common";

export default class ValueLabelView extends BaseView {
    private valueText: Phaser.GameObjects.Text;
    private percentText: Phaser.GameObjects.Text;
    public  currentValue: number;
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene);
      scene.add.existing(this);
      this.setViewPosition(x,y);
      this.valueText = scene.add.text(x, y, '0', { fontSize: '18px', color: '#333' }).setOrigin(0.5);
      this.percentText = scene.add.text(x, y + 24, '0%', { fontSize: '18px', color: '#333' }).setOrigin(0.5);
      this.add([this.valueText, this.percentText]);
    }
    update(value: number, percent: number,showValue: boolean, showPercent: boolean) {
      this.currentValue = value;
      this.valueText.setText(value.toString()).setVisible(showValue);
      this.percentText.setText(`${percent}%`).setVisible(showPercent);
    }
  }