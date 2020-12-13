import { IEntityBase } from "./baseEntity";

export interface IEntityBook extends IEntityBase{
    name:string;
    level:string;
    writers:string[];
    editions:string[];
}