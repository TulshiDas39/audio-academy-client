import { ApiRoutes } from "../../lib";
import { IEntityBook, ITutorialEntity } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export interface ITutorialData extends ITutorialEntity{
    book:IEntityBook;
}
export function ApiGetTutorials(){
    return Intercept.get<ITutorialData[]>(ApiRoutes.TutorialAll);
}