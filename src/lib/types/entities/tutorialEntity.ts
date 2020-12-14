import { IEntityBase } from "./baseEntity";

export interface ITutorialEntity extends IEntityBase{
  title: string;
  bookId: string;
  bookEdition:string;
  description: string;
}