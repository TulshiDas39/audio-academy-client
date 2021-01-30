import { IEntityBook, IEntityUser } from "../../../lib/types/entities";
import { IClipModel } from "../../../lib/types/models";

export interface IModalData{
    createClipModal:{ 
       existing?: IClipModel,
    },
    registerContributorModal:{
        existing?:IEntityUser
    },
    createBookModal:{
        existing?:IEntityBook
    }
}

export const ModalData:IModalData={
    createClipModal:{
        existing:undefined,
    },
    registerContributorModal:{
        existing:undefined
    },
    createBookModal:{
        existing:undefined
    }
    
}