import { ApiRoutes } from "../../lib";
import { IClipEntity, ITutorialEntity } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export interface IGetSingleTutorialDetails{
    tutorial:ITutorialEntity;
    clips: IClipEntity[];
}

export function apiGetSingleTutorialDetails(tutorialId:string){
    return Intercept.get(ApiRoutes.Tutorial+"/"+tutorialId);
}