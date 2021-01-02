import { IClipModel } from "../../../lib/types/models";

export interface IModalData{
    createClipModal:{ 
       existing?: IClipModel,
    },
}

export const ModalData:IModalData={
    createClipModal:{
        existing:undefined,
    }
}