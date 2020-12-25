import { IClipEntity, IEntityUser } from "../entities";

export interface IClipModel extends IClipEntity{
    contributor?:IEntityUser;
}