export default interface FillableForCell {
    fill(x: number,
        y: number,
        w: number,
        h: number,
        color: number,
        duration: number): void;
}
