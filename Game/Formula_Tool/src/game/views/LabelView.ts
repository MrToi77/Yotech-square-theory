import LabelDTO from "../dtos/LabelDTO";
import Phaser from "phaser";

export default class LabelView extends Phaser.GameObjects.Text{
    constructor(scene: Phaser.Scene, label: LabelDTO){
        super(scene, label.position.x, label.position.y, label.char, {fontSize: '100px', color: '#ffffff'});
        this.setOrigin(0.5, 0.5);
        this.setScale(0.5, 0.5);
        this.setFontFamily('Arial');
        this.setFontSize('20px');
    }
    
    public updateLabel(label: LabelDTO){
        this.setText(label.char);
        this.setPosition(label.position.x, label.position.y);
    }
    
    public tweenLabel(x: number, y: number, duration: number = 1000){
        this.scene.tweens.add({
            targets: this,
            x: x,
            y: y,
            duration: duration,
            ease: 'Linear'
        });
    }
}