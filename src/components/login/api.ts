import { ApiRoutes } from "../../lib"
import { Intercept } from "../../lib/utils/interceptor"

export type TApiLoginRequest={
    email:string;
    password:string;
}
export type TApiLoginResponse={
    access_token:string;
}
export function apiLogin(requestModel:TApiLoginRequest){
    return Intercept.post<TApiLoginResponse>(ApiRoutes.Login,requestModel);
}