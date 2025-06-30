import PointDTO from "../dtos/PointDTO";

export default interface Rotatable {
    rotate(axisPoint: number, angle: number, duration: number): void;
}