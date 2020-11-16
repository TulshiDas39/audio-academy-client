import { EnumUserType } from "../../constants";
import { IEntityBase } from "./baseEntity";

export interface IEntityUser extends IEntityBase{
    name:string;
    phone:string;
    email:string;
    type:EnumUserType;
}