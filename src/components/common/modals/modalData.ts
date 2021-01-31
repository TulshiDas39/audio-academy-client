import { IEntityBook, IEntityUser } from "../../../lib/types/entities";
import { IClipModel } from "../../../lib/types/models";
import { ITutorialData } from "../../Tutorials/api";

export interface IModalData{
    createClipModal:{ 
       existing?: IClipModel,
    },
    registerContributorModal:{
        existing?:IEntityUser
    },
    createBookModal:{
        existing?:IEntityBook
    },
    createTutorialModal:{
        existing?:ITutorialData
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
    },
    createTutorialModal:{
        existing:undefined
    }
    
}