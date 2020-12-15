import { ApiRoutes } from "../../lib";
import { ITutorialEntity } from "../../lib/types/entities";
import { ITutorialModel } from "../../lib/types/models";
import { Intercept } from "../../lib/utils/interceptor";

export function ApiGetTutorials(){
    return Intercept.get<ITutorialModel[]>(ApiRoutes.TutorialAll);
}