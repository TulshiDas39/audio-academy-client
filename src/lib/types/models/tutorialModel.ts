import { IEntityBase, IEntityBook } from "../entities";

export interface ITutorialModel extends IEntityBase{
    title: string;
    bookId: string;
    book:IEntityBook;
    bookEdition:string;
    description: string;
}