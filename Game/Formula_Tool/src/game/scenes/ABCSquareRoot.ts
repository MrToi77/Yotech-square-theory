
import PointDTO from "../dtos/PointDTO";
import CellDTO from "../dtos/CellDTO";
import CellView from "../views/CellView";
import EdgeDTO from "../dtos/EdgeDTO";
import EdgeView from "../views/EdgeView";
import { GridColors } from "../enums/GridColors";
import LabelView from "../views/LabelView";
import LabelDTO from "../dtos/LabelDTO";
import { EdgeType } from "../enums/EdgeType";

let culTime = 0;

let perviousEdge: EdgeDTO | null = null;

const margin = 20;

const data = {
    Length: 550,
    Ratios: [0.4, 0.3, 0.3],
    Text: ['A', 'B', 'C'],
    durationForEachAnim: 1000
};

const spaceX = 50; // khoảng cách giữa tâm hai phần tử trục ngang

// Lấy mảng chỉ gồm giá trị màu (số) từ enum
const colorValues = Object.values(GridColors).filter(
    (v) => typeof v === "number"
) as number[];

export default class ABCSquareRoot extends Phaser.Scene {
    private topTexts: LabelView[] = [];
    private leftTexts: LabelView[] = [];
    private bottomTexts: LabelView[] = [];
    private rightTexts: LabelView[] = [];
    private cellTexts: LabelView[][] = [];
    private markViews: LabelView[] = [];
    private leftSideTexts: LabelView[] = [];
    private rightSideTexts: LabelView[] = [];
    constructor() {
        super({ key: "ABCSquareRoot" });
    }

    init(data: any): void {
    }

    create(): void {

        const formulaData = this.generateFormulaParts(data.Text)

        const WX = (this.scale.width - data.Length) / 2;
        const WY = (this.scale.height - data.Length) / 2;

        const formulaX = this.scale.width / 2;
        const formulaY = WY + data.Length + 3 * margin;

        const cellData = new CellDTO(new PointDTO(WX, WY), new PointDTO(WX + data.Length, WY), new PointDTO(WX, WY + data.Length), new PointDTO(WX + data.Length, WY + data.Length));
        const cellParts = cellData.split(data.Ratios);

        const TopEdgeData = new EdgeDTO(cellData.tl, cellData.tr);
        const topParts = TopEdgeData.split(data.Ratios);

        const LeftEdgeData = new EdgeDTO(cellData.tl, cellData.bl);
        const leftParts = LeftEdgeData.split(data.Ratios);

        const RightEdgeData = new EdgeDTO(cellData.tr, cellData.br);
        const rightParts = RightEdgeData.split(data.Ratios);

        const BottomEdgeData = new EdgeDTO(cellData.bl, cellData.br);
        const bottomParts = BottomEdgeData.split(data.Ratios);


        topParts.forEach((edge, index) => {
            if (index === 0) {
                const edgeView = new EdgeView(this, edge);
                this.add.existing(edgeView);
                edgeView.draw(colorValues[index % colorValues.length], data.durationForEachAnim);
            } else {
                // Đảo hướng edge
                const t = 1 - edge.length / perviousEdge!.length;
                edge.end.x = perviousEdge!.start.x + t * (perviousEdge!.end.x - perviousEdge!.start.x);
                edge.end.y = perviousEdge!.start.y + t * (perviousEdge!.end.y - perviousEdge!.start.y);
                const edgeView = new EdgeView(this, edge);
                this.add.existing(edgeView);
                this.time.delayedCall(culTime, () => {
                    culTime += data.durationForEachAnim;
                    edgeView.draw(colorValues[index % colorValues.length], 0);
                    edgeView.rotateStart(-180);
                });
            }
            culTime += data.durationForEachAnim;
            perviousEdge = edge;
        });

        // Left Edge

        const leftEdgeView = new EdgeView(this, TopEdgeData);
        this.add.existing(leftEdgeView);
        this.time.delayedCall(culTime, () => {
            leftEdgeView.NoAnimationSplitEdge(data.Ratios);
            leftEdgeView.rotateStart(90);
        });
        culTime += data.durationForEachAnim;

        // Rotate bottom edge fist time
        const bottomEdgeViewRotate1 = new EdgeView(this, new EdgeDTO(cellData.tl, cellData.bl));
        this.add.existing(bottomEdgeViewRotate1);
        this.time.delayedCall(culTime, () => {
            bottomEdgeViewRotate1.NoAnimationSplitEdge(data.Ratios);
            bottomEdgeViewRotate1.rotateEnd(90);
        });
        culTime += data.durationForEachAnim;

        // Rotate bottom edge second time
        const bottomEdgeViewRotate2 = new EdgeView(this, new EdgeDTO(cellData.bl, cellData.br));
        this.add.existing(bottomEdgeViewRotate2);
        this.time.delayedCall(culTime, () => {
            bottomEdgeViewRotate1.destroy();
            bottomEdgeViewRotate2.NoAnimationSplitEdge(data.Ratios);
            bottomEdgeViewRotate2.rotateCenter(360);
        });
        culTime += data.durationForEachAnim;
        
        const rightEdgeView = new EdgeView(this, new EdgeDTO(cellData.bl, cellData.br));
        this.add.existing(rightEdgeView);
        this.time.delayedCall(culTime, () => {
            rightEdgeView.NoAnimationSplitEdge(data.Ratios);
            rightEdgeView.rotateEnd(90);
        });
        culTime += data.durationForEachAnim;

        let culLengthCol = 0

        for(let i = 0; i < topParts.length - 1; i++){
            const topEdgeData = topParts[i];
            culLengthCol += topEdgeData.length;
            const length = culLengthCol;
            for ( let j = 0 ; j < leftParts.length; j++){
                const leftEdgeData = leftParts[j];
                const edge = new EdgeView(this, leftEdgeData);
                this.add.existing(edge);
                this.time.delayedCall(culTime, () => {
                    edge.draw(colorValues[j % colorValues.length], 0);
                    edge.moveCenter(leftEdgeData.center.x + length, leftEdgeData.center.y, data.durationForEachAnim);
                })
                culTime += data.durationForEachAnim;
            }
        }


        let culLengthRow = 0
        for(let i = 0; i < leftParts.length - 1; i++){
            const leftEdgeData = leftParts[i];
            culLengthRow += leftEdgeData.length;
            const length = culLengthRow;
            for ( let j = 0 ; j < topParts.length; j++){
                const topEdgeData = topParts[j];
                const currentLength = this.checkIndex(j) ? topEdgeData.length : 0;
                const edge = new EdgeView(this, topEdgeData);
                this.add.existing(edge);
                this.time.delayedCall(culTime, () => {
                    edge.draw(colorValues[j % colorValues.length], 0);
                    edge.moveCenter(topEdgeData.center.x + currentLength, topEdgeData.center.y + length, data.durationForEachAnim);
                })
                culTime += data.durationForEachAnim;
            }
        }   

        // Text

        // Draw Texts for Edges

        // Top Text s
        this.createTextForEdge(topParts, data.Text, culTime, EdgeType.TOP);

        // Left Texts
        this.createTextForEdge(leftParts, data.Text, culTime, EdgeType.LEFT);

        // Bottom Texts
        this.createTextForEdge(bottomParts, data.Text, culTime, EdgeType.BOTTOM);

        // Right Texts
        this.createTextForEdge(rightParts, data.Text, culTime, EdgeType.RIGHT);

        // Draw Texts for Cells

        const rowTexts = data.Text;
        const colTexts = data.Text;
        for (let i = 0; i < rowTexts.length; i++) {
            this.cellTexts[i] = [];
        }
        cellParts.forEach((cell, index) => {
            const position = cell.center;
            const textDTO = new LabelDTO(new PointDTO(position.x, position.y), this.mixText(rowTexts[cell.index.row], colTexts[cell.index.col]));
            const textView = new LabelView(this, textDTO);
            textView.setVisible(false);
            this.cellTexts[cell.index.row][cell.index.col] = textView;
        });

        // Formula
        this.renderFormula(formulaData);

        // Move Texts

        // Edge to Cell
        culTime += data.durationForEachAnim * topParts.length;

        cellParts.forEach((cell, index) => {
            const position = cell.center;

            const cloneCol = this.topTexts[cell.index.col].clone().setVisible(false);
            const cloneRow = this.leftTexts[cell.index.row].clone().setVisible(false);
            this.add.existing(cloneCol);
            this.add.existing(cloneRow);

            this.time.delayedCall(culTime, () => {
                cloneCol.setVisible(true);
                cloneRow.setVisible(true);
                cloneCol.move(position.x, position.y, data.durationForEachAnim);
                cloneRow.move(position.x, position.y, data.durationForEachAnim);

                const cellLabel = this.cellTexts[cell.index.row][cell.index.col];
                cellLabel.setVisible(true);
                cellLabel.scaleLabel(1, data.durationForEachAnim);
            });

            culTime += data.durationForEachAnim;
        });
        
        // // Fill Cells
        // const cellView = new CellView(this, cellData);
        // this.add.existing(cellView);
        // const cellViews = cellView.split(data.Ratios);
        // cellViews.forEach((view, index) => {
        //     const viewData = cellParts[index].index;
        //     const groupKey = (viewData.row + 1) * (viewData.col + 1);
        //     this.time.delayedCall(culTime, () => {
        //         view.fill(colorValues[groupKey % colorValues.length], data.durationForEachAnim);
        //     });
        //     culTime += data.durationForEachAnim;
        // });

        // Move Cell Texts to Formula
        // Di chuyển Text ở đường chéo chính
        const amountOfTextOnMainDiagonal = topParts.length;
        let index = 0;

        for (let i = 0; i < this.rightSideTexts.length; i++) {
            if (index === amountOfTextOnMainDiagonal) break;
            const text = this.rightSideTexts[i];
            console.log(`i = ${i} text = ${text.text} index = ${index}`);
            const destination = text.labelDTO.position;
            const capturedIndex = index;
            if (this.cellTexts[capturedIndex] && this.cellTexts[capturedIndex][capturedIndex]) {
                this.time.delayedCall(culTime, () => {
                    this.cellTexts[capturedIndex][capturedIndex].move(destination.x, destination.y, data.durationForEachAnim);
                });
            }
            index++;
            culTime += data.durationForEachAnim;
        }

        // Di chuyển các phần từ còn lại
        const diagonalCount = topParts.length;
        let pairIndex = diagonalCount; // bắt đầu sau A², B², C²

        for (let row = 0; row < diagonalCount; row++) {
            for (let col = row + 1; col < diagonalCount; col++) {
                const cell1 = this.cellTexts[row][col];
                const cell2 = this.cellTexts[col][row];
                const textTarget = this.rightSideTexts[pairIndex];
                const destination = textTarget.labelDTO.position;

                if (cell1 && cell2 && textTarget.text !== '+') {
                    this.time.delayedCall(culTime, () => {
                        cell1.move(destination.x, destination.y, data.durationForEachAnim / 2);
                        cell2.move(destination.x, destination.y, data.durationForEachAnim / 2);
                    });
                    culTime += data.durationForEachAnim;
                }
                pairIndex++;
            }
        }


    }

    private mixText(text1: string, text2: string): string{
        if(text1 === text2){
            return `${text1}²`
        }else{
            return `${text1}${text2}`
        }
    }

    private drawChar(startX: number, char: string, y: number, index: number): LabelView{
        const pos = new PointDTO(startX + index * spaceX, y);;
        const dto = new LabelDTO(pos, char);
        const view = new LabelView(this, dto);
        view.scaleLabel(1, data.durationForEachAnim);
        return view;
    }

    private checkIndex(i: number): boolean {
        return i > 0;
    }

    private createTextForEdge(edge: EdgeDTO[], text: string[], culTime: number, type: EdgeType): void {
        for(let i = 0; i < edge.length; i++){
            const position = edge[i].center;
            let x = position.x;
            let y = position.y;
            if(type === EdgeType.TOP){
                y -= margin;
            }else if(type === EdgeType.LEFT){
                x -= margin;
            }else if(type === EdgeType.BOTTOM){
                y += margin;
            }else if(type === EdgeType.RIGHT){
                x += margin;
            }

            const textDTO = new LabelDTO(new PointDTO(x, y), text[i]);
            const textView = new LabelView(this, textDTO);

            if(type === EdgeType.TOP){
                this.topTexts.push(textView);
            }else if(type === EdgeType.LEFT){
                this.leftTexts.push(textView);
            }else if(type === EdgeType.BOTTOM){
                this.bottomTexts.push(textView);
            }else if(type === EdgeType.RIGHT){
                this.rightTexts.push(textView);
            }

            this.time.delayedCall(culTime, () => {
                textView.scaleLabel(1, data.durationForEachAnim);
            });
            culTime += data.durationForEachAnim;
        }
    }

    private generateFormulaParts(texts: string[]) {
        const Left_Side = [`(${texts.join(' + ')})²`];
    
        const Right_Side: string[] = [];
        const Marks: string[] = [];
    
        // A², B², C²,...
        for (let i = 0; i < texts.length; i++) {
            Right_Side.push(`${texts[i]}²`);
            if (i < texts.length - 1) Marks.push('+');
        }
    
        // 2AB, 2AC, 2BC,...
        for (let i = 0; i < texts.length; i++) {
            for (let j = i + 1; j < texts.length; j++) {
                Right_Side.push(`2${texts[i]}${texts[j]}`);
                Marks.push('+');
            }
        }
    
        return {
            Left_Side,
            Right_Side,
            Marks
        };
    }

    private renderFormula(formulaData: {
        Left_Side: string[],
        Right_Side: string[],
        Marks: string[],
    }): void {
        const { Left_Side, Marks, Right_Side: Right_Side_Terms} = formulaData;
    
        const formulaX = this.scale.width / 2;
        const formulaY = this.scale.height - 30;
        const charPadding = 20;
    
        const groups: string[][] = [];
    
        // Gom nhóm: [(vế trái), ('='), [term, mark], [term, mark], ...]
        groups.push(Left_Side);
        groups.push(['=']);
        for (let i = 0; i < Right_Side_Terms.length; i++) {
            const term = Right_Side_Terms[i];
            const mark = Marks[i] || '';
            groups.push(mark ? [term, mark] : [term]);
        }
    
        const tempTexts: Phaser.GameObjects.Text[][] = [];
        let totalWidth = 0;
    
        // Đo từng group
        groups.forEach(group => {
            const groupTexts: Phaser.GameObjects.Text[] = [];
            let groupWidth = 0;
    
            group.forEach(char => {
                const text = this.add.text(0, 0, char, {
                    fontFamily: 'Arial',
                    fontSize: '24px',
                    color: '#ffffff'
                }).setVisible(false);
                groupTexts.push(text);
                groupWidth += text.width;
            });
    
            tempTexts.push(groupTexts);
            totalWidth += groupWidth + charPadding;
        });
    
        const startX = formulaX - totalWidth / 2;
        let currentX = startX;
    
        // Vẽ thật sự
        for (let g = 0; g < tempTexts.length; g++) {
            const group = tempTexts[g];
            for (let t = 0; t < group.length; t++) {
                const temp = group[t];
                const labelDTO = new LabelDTO(new PointDTO(currentX + temp.width / 2, formulaY), temp.text);
                const view = new LabelView(this, labelDTO);
                view.scaleLabel(1, data.durationForEachAnim);
    
                // Phân loại nếu cần
                if (g === 0) this.leftSideTexts.push(view);
                else if (g === 1) this.markViews.push(view);
                else if (t === 0) this.rightSideTexts.push(view);
                else this.markViews.push(view);
    
                currentX += temp.width;
            }
            currentX += charPadding;
        }
    
        // Dọn temp text
        tempTexts.flat().forEach(t => t.destroy());
    }
    
}
