import EdgeDTO from "../dtos/EdgeDTO";
import PointDTO from "../dtos/PointDTO";
import CellDTO from "../dtos/CellDTO";
import GridView from "../views/GridView";
export default class TestSquareDeclare {
    public graphics!: Phaser.GameObjects.Graphics;
    public padding = 60; // more padding to fit external 
    public cols = 2;
    public rows = 2;
    public weightsX: number[] = [1, 1];
    public weightsY: number[] = [1, 1];
    public cells: Phaser.GameObjects.Rectangle[][] = [];
    public labelsX: string[] = [];
    public labelsY: string[] = [];
    public areaText?: Phaser.GameObjects.Text;
    public labelOject: Phaser.GameObjects.Text[] = [];
    public mode: 'square' | 'line' = 'square';
    public lines: EdgeDTO[] = [];
    public lastLine: EdgeDTO | null = null;
    public lastLineStart: PointDTO = new PointDTO(0, 0);
    public lastLineEnd: PointDTO = new PointDTO(0, 0);
    public lastLineType: 'top' | 'left' | 'bottom' | 'right' | null = null;
    public lastLineStyle: { lineWidth?: number; color?: number } | null = null;
    public cell: CellDTO | null = null;
    public currentGrid: GridView | null = null;
    constructor() {}
}
