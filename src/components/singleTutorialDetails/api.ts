import { ApiRoutes } from "../../lib";
import { IClipEntity, ITutorialEntity } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export interface IGetSingleTutorialDetails{
    tutorial:{_doc:ITutorialEntity};
    clips: IClipEntity[];
}

export function apiGetSingleTutorialDetails(tutorialId:string){
    return Intercept.get<IGetSingleTutorialDetails>(ApiRoutes.Tutorial+"/byId/"+tutorialId);
}