
interface TimeLine {
    firstLine: {startTime: number, drawTime: number}
    secondLine: {startTime: number, drawTime: number}
    thirdLine: {startTime: number, drawTime: number, startSecondLineTime: number}
    fourthLine: {startTime: number, drawTime: number}
    drawColsGrid: {startTime: number, drawTime: number}
    drawRowsGrid: {startTime: number, drawTime: number}
    fillCell: {startTime: number, drawTime: number}
    drawLabel: {startTime: number, drawTime: number}
}
export const TimeLineValues: TimeLine = {
    firstLine: {startTime: 0, drawTime: 1000},
    secondLine: {startTime: 1000, drawTime: 0},
    thirdLine: {startTime: 2000, drawTime: 0, startSecondLineTime: 3000},
    fourthLine: {startTime: 4000, drawTime: 0},
    drawColsGrid: {startTime: 5000, drawTime: 1000},
    drawRowsGrid: {startTime: 6000, drawTime: 1000},
    fillCell: {startTime: 7000, drawTime: 2000},
    drawLabel: {startTime: 9000, drawTime: 1000},
};