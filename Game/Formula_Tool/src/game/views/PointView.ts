import PointDTO from "../dtos/PointDTO";
export default class PointView extends Phaser.GameObjects.Container {
    private point: PointDTO;
    private phaserPoint: Phaser.GameObjects.Arc;
    constructor(scene: Phaser.Scene, point: PointDTO){
        super(scene, point.x, point.y);
        scene.add.existing(this);
        this.point = point;
    } 

    public draw(){
        const circle = this.scene.add.circle(this.point.x, this.point.y, 10, 0x777222, 1).setScale(0);
        this.add(circle);
        this.animCre(circle);
    }
    public animCre(circle: Phaser.GameObjects.Arc){
        this.scene.tweens.add({
            targets: circle,
            scaleX: 1,
            scaleY: 1,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
                circle.setScale(1);
            }
        });
    }
    public animDes(circle: Phaser.GameObjects.Arc){
        this.scene.tweens.add({
            targets: circle,
            scaleX: 0,
            scaleY: 0,
            duration: 1000,
            ease: 'Power2.easeInOut',
            onComplete: () => {
                if (circle) {
                    circle.destroy();
                }else{
                    console.log("circle is undefined");
                }
            }
        });
    }
}
