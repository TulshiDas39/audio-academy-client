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


export enum EnumModals {
  REGISTER_CONTRIBUTOR = 'REGISTER_CONTRIBUTOR',
  CREATE_CLIP = 'CREATE_CLIP',
  CREATE_TUTORIAL = 'CREATE_TUTORIAL',
  CREATE_BOOK = "CREATE_BOOK",
  BOOK_DETAILS_MODAL='BOOK_DETAILS_MODAL',
  TOAST='TOAST',
  RESUBMIT_CLIP='RESUBMIT_CLIP'
}