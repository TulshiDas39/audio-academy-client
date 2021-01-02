import { ApiRoutes } from "../../../lib";
import { IClipEntity, IEntityBook, ITutorialEntity } from "../../../lib/types/entities";
import { ISearchModel } from "../../../lib/types/models";
import { Intercept } from "../../../lib/utils/interceptor";

export interface ICreateContributorPayload{
    name: string;
    email: string;
    phone: string;
    password: string;
}

export function ApiCreateContributor(payload:ICreateContributorPayload){
    return Intercept.post<boolean>(ApiRoutes.CreateContributor,payload)
}

export interface ICreateClipPayload{
    title: string;
    description: string;
    tutorialId: string;
    lession: string;
    deadline?: string;
    contributorId?: string;
    images?: string[];
}
export function ApiCreateClip(payload:ICreateClipPayload){
    return Intercept.post(ApiRoutes.Clip,payload);
}

export function ApiUpdateClip(payload:IClipEntity){
    return Intercept.put<IClipEntity>(ApiRoutes.Clip,payload);
}

export interface ICreateTutorialPayload{
    title: string;
    description?:string;
    bookId: string;
    bookEdition: string;
}
export function ApiCreateTutorial(payload:ICreateTutorialPayload){
    return Intercept.post(ApiRoutes.Tutorial,payload);
}

export interface ICreateBookPayload{
    name: string;
    writers: string[];
    level: string;
    editions:string[];
}
export function ApiCreateBook(payload:ICreateBookPayload){
    return Intercept.post(ApiRoutes.Book,payload);
}

export function ApiSearchBook(query:ISearchModel){
    return Intercept.get<IEntityBook[]>(`${ApiRoutes.BookSearch}?keyword=${query.keyword}` )
}

export function ApiSearchTutorial(query:ISearchModel){
    return Intercept.get<ITutorialEntity[]>(`${ApiRoutes.TutorialSearch}?keyword=${query.keyword}` )
}