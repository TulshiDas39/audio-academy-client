import { ApiRoutes } from "../../lib";
import { IClipEntity } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export function getAssignedClips(){
    return Intercept.get<IClipEntity[]>(ApiRoutes.AssignedClip);
}