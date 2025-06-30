import LabelDTO from "../dtos/LabelDTO";
import Phaser from "phaser";

const extraTimeForMove = 300;
export default class LabelView extends Phaser.GameObjects.Text{
    public labelDTO: LabelDTO;
    constructor(scene: Phaser.Scene, label: LabelDTO){
        super(scene, label.position.x, label.position.y, label.char, {fontSize: '100px', color: '#ffffff'});
        this.setOrigin(0.5, 0.5);
        this.setScale(0);
        this.setFontFamily('Arial');
        this.setFontSize('15px');
        this.labelDTO = label;
        this.scene.add.existing(this);
    }
    public scaleLabel(scale: number, duration: number = 1000){
        this.scene.tweens.add({
            targets: this,  
            scale: scale,
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                this.setScale(scale);
                this.setDepth(1000);
            }
        });
    }
    
    public updateLabel(label: LabelDTO){
        this.setText(label.char);
        this.setPosition(label.position.x, label.position.y);
    }
    
    public move(
        x: number,
        y: number,
        duration: number = 1000
      ) {
        this.setAlpha(1);
      
        this.scene.tweens.add({
          targets: this,
          x,
          y,
          alpha: 0,
          duration: duration + extraTimeForMove,
          ease: 'Linear',
          onComplete: () => {
            this.destroy();
          }
        });
      }
    public clone(): LabelView {
        const copy = new LabelView(this.scene, this.labelDTO);
        copy.setScale(1);
        return copy;
      }
}