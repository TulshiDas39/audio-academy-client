import { ApiRoutes } from "../../lib";
import { IEntityUser } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export function ApiGetAllContributors(){
    return Intercept.get<IEntityUser[]>(ApiRoutes.AllContributors);
}

export function ApiDeleteUser(id:string){
    return Intercept.delete<boolean>(ApiRoutes.User+"/"+id);
}