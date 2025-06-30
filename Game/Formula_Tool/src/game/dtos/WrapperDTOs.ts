import EdgeDTO from "./EdgeDTO";
export default class EdgeDTOWrapper extends EdgeDTO {
    constructor(data: any) {
      super(data.start, data.end, data.ratios, data.color);
    }
  }