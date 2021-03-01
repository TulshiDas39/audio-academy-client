import { IEntityBook, IEntityUser } from "../../../lib/types/entities";
import { IClipModel } from "../../../lib/types/models";
import { IBookDetails } from "../../contributorClip";
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
    },
    bookDetailsModal:{
        book?:IBookDetails
    },
    AppToast:{
        title?: string;
        message: string;
        customClass?: string;
    },
    resubmitModal:{
        clip?:IClipModel;
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
    },
    bookDetailsModal:{
        book:null!,
    },
    AppToast:{
        message:"",
    },
    resubmitModal:{
        
    }
    
}