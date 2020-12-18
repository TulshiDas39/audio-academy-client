import { ApiRoutes } from "../../lib";
import { IEntityBook, ITutorialEntity } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export interface ITutorialData{
    _doc: ITutorialEntity;
    book:IEntityBook;
}
export function ApiGetTutorials(){
    return Intercept.get<ITutorialData[]>(ApiRoutes.TutorialAll);
}