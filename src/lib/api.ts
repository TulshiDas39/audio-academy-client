import { Intercept } from "./utils/interceptor";
import { ApiRoutes } from "./constants/Routes";
import { ApiHelpers } from "./utils/ApiHelper";

export function apiDownloadFile(id:string){
    return Intercept.get<Blob>(ApiRoutes.FileDownload+id,{
        ...ApiHelpers.getAuthorizedRequestConfig(),
        transformResponse: undefined,
        responseType: 'blob',
    });    
}