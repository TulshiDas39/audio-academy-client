import {AxiosResponse} from 'axios';

export interface IRequestFailedModel{
    statusCode?: number;
    error?: any;
    message: string;
}

export interface IResponseModel<T>{
    response?:AxiosResponse<T>;
    error?:IRequestFailedModel;
}

export type IAxiosErrorModel = AxiosResponse<IRequestFailedModel> | undefined;