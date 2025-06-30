export default class PointDTO extends Phaser.Math.Vector2{
    addOffset(offset: number) {
        return new PointDTO(this.x + offset, this.y + offset);
    }
}