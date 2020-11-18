export type TResponse={
    response:any;
    error:any;
}

export interface IThunkState{
    isBusy:boolean;
    version:number;
}

export interface IThunkParam<TRequest=undefined,TResponse=undefined>{
    requestModel?:TRequest;
    updatedResponse?:TResponse;
}