import { EnumUserType } from "../../../lib";
import { IEntityUser } from "../../../lib/types/entities";

export interface IApiSignUpRequest{
    email: string;
    password: string;
    name:string;
    phone:string;
    type: EnumUserType;
}

export interface IApiSignUpResponse{
    profile:IEntityUser,
    access_token:string,
}