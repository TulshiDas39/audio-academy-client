import { ApiRoutes } from "../../lib";
import { IClipEntity, ITutorialEntity } from "../../lib/types/entities";
import { IClipModel } from "../../lib/types/models";
import { Intercept } from "../../lib/utils/interceptor";

export interface IGetSingleTutorialDetails{
    tutorial:{_doc:ITutorialEntity};
    clips: IClipModel[];
}

export function apiGetSingleTutorialDetails(tutorialId:string){
    return Intercept.get<IGetSingleTutorialDetails>(ApiRoutes.Tutorial+"/byId/"+tutorialId);
}