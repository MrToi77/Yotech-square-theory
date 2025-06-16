export default interface DrawableForCell {
    draw(startX: number,
        startY: number,
        h: number,
        w: number,
        ratioCols: number[],
        ratioRows: number[]): void;
}