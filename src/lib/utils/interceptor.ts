import Axios, { AxiosRequestConfig } from "axios";
import { IResponseModel } from "../types";
import { ApiHelpers } from "./ApiHelper";

export class Intercept{
    static get<T=any>(url:string,config?:AxiosRequestConfig):Promise<IResponseModel<T>>{
        config = config || ApiHelpers.getAuthorizedRequestConfig();
        return Axios.get<T>(url, config).then(response => ({ response }))
            .catch(err => ({ error: ApiHelpers.handleHttpFailed(err.response)}));
    }

    static post<T=any>(url:string,data:any,config?:AxiosRequestConfig):Promise<IResponseModel<T>>{
        config = config || ApiHelpers.getAuthorizedRequestConfig();
        return Axios.post<T>(url, data,config).then(response => ({ response }))
            .catch(err=>({error:ApiHelpers.handleHttpFailed(err.response) }));
    }

    static put<T=any>(url:string,data:any,config?:AxiosRequestConfig):Promise<IResponseModel<T>>{
        config = config || ApiHelpers.getAuthorizedRequestConfig();
        return Axios.put<T>(url, data,config).then(response => ({ response }))
            .catch(err => ({ error: ApiHelpers.handleHttpFailed(err.response) }));
    }

    static delete<T=any>(url:string,config?:AxiosRequestConfig):Promise<IResponseModel<T>>{
        config = config || ApiHelpers.getAuthorizedRequestConfig();
        return Axios.delete<T>(url, config).then(response => ({ response }))
            .catch(err => ({ error: ApiHelpers.handleHttpFailed(err.response) }));
    }
}