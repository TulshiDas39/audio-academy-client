import { ApiRoutes } from "../../../lib";
import { Intercept } from "../../../lib/utils/interceptor";

export interface ICreateContributorPayload{
    name: string;
    email: string;
    phone: string;
    password: string;
}

export function ApiCreateContributor(payload:ICreateContributorPayload){
    return Intercept.post<boolean>(ApiRoutes.CreateContributor,payload)
}