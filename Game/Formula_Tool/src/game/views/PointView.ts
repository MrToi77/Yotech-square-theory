import PointDTO from "../dtos/PointDTO";
export default class PointView extends Phaser.GameObjects.Container {
    private point: PointDTO;
    private phaserPoint: Phaser.GameObjects.Arc;
    constructor(scene: Phaser.Scene, point: PointDTO){
        super(scene, point.x, point.y);
        scene.add.existing(this);
        this.point = point;
    } 

    public draw() {
        if (this.phaserPoint) {
            this.remove(this.phaserPoint, true); // remove & destroy cũ
        }
    
        this.phaserPoint = this.scene.add.circle(this.point.x, this.point.y, 10, 0x777222, 1).setScale(0.5);
        this.add(this.phaserPoint);
        this.animCre();
    }
    
    public animCre() {
        this.scene.tweens.add({
            targets: this.phaserPoint,
            scaleX: 1,
            scaleY: 1,
            duration: 1000,
            ease: 'Linear'
        });
    }; 

    public animDes(){
        this.scene.tweens.add({
            targets: this.phaserPoint,
            scaleX: 0,
            scaleY: 0,
            duration: 1000,
            ease: 'Power2.easeInOut',
            onComplete: () => {
                if (this.phaserPoint) {
                    this.phaserPoint.destroy();
                }else{
                    console.log("Point is undefined");
                }
            }
        });
    }
}
