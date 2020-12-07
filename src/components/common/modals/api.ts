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

export interface ICreateClipPayload{
    title: string;
    description: string;
    tutorialId: string;
    lession: string;
    deadline?:string;
    contributorId?:string;
    images?:string[];
}
export function ApiCreateClip(payload:ICreateClipPayload){
    return Intercept.post(ApiRoutes.Clip,payload);
}