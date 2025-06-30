import Phaser from "phaser";
import Fillable from "../interfaces/Fillable";
import Drawable from "../interfaces/Drawable";
import Rotatable from "../interfaces/Rotatable";
import PointDTO from "../dtos/PointDTO";

export abstract class BaseView extends Phaser.GameObjects.Container implements Drawable, Fillable, Rotatable {
    constructor(scene: Phaser.Scene) {
        super(scene);
    }
    public abstract draw(color: number, duration: number): void;
    public abstract fill(color: number, duration: number): void;
    public abstract rotate(axisPoint: number, angle: number, duration: number): void;
}