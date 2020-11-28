import { ApiRoutes } from "../../lib";
import { IClipEntity } from "../../lib/types/entities";
import { ApiHelpers } from "../../lib/utils/ApiHelper";
import { Intercept } from "../../lib/utils/interceptor";

export function apiGetAssignedClips(){
    return Intercept.get<IClipEntity[]>(ApiRoutes.AssignedClip);
}

interface ISubClipBody{
    clipId:string;
    file:File;
}
export function apiSubClip(body: ISubClipBody){
    const formData = new FormData();
    formData.append('file',body.file);
    formData.append('clipId',body.clipId);
    const config = ApiHelpers.getAuthorizedRequestConfig();
    config.headers={
        ...config.headers,
        'Content-Type':'multipart/form-data'
    }
    return Intercept.post<IClipEntity[]>(ApiRoutes.SubmitClip,formData,config);
}
