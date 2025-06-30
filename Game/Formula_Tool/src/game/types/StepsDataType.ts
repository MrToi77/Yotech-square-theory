export type StepsData = {
    Function: string;
    EdgeId: number;
    Color: string;
    Duration: number;
    ratioPointAxis: number;
    Angle: number;
};

export class ActionData {
    name: string;
    data: any;
}

export class StepDataNew {
    index: number;
    description: string;
    entities: number[];
    action: ActionData;
    duration: number;
};

