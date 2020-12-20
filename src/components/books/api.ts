import { ApiRoutes, UiRoutes } from "../../lib";
import { IEntityBook } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export function apiGetBooks(){
    return Intercept.get<IEntityBook[]>(ApiRoutes.BooksAll)
}