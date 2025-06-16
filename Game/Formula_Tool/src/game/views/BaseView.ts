import Phaser from "phaser";
import DrawableForCell from "../interfaces/Drawable";
import Fillable from "../interfaces/Fillable";

export abstract class BaseView extends Phaser.GameObjects.Container implements DrawableForCell, Fillable {
    constructor(scene: Phaser.Scene) {
        super(scene);
    }
    public abstract draw(): void;
    public abstract fill(color: number): void;
}