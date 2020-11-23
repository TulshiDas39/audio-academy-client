import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiRoutes, IThunkParam } from "../../lib";
import { IClipEntity } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export class ThunkContributorDashboard{
    private static assignedClips:IClipEntity[]=[];
    static get AssignedClips(){
        return ThunkContributorDashboard.assignedClips;
    }
    static GetAssignedClip = createAsyncThunk(
        ApiRoutes.AssignedClip,
        async (param?:IThunkParam<null,IClipEntity[]>) => {
          if(param?.updatedResponse) {
            ThunkContributorDashboard.assignedClips = param.updatedResponse;
            return;
          }
          const result = await Intercept.get<IClipEntity[]>(ApiRoutes.AssignedClip);
          if(result.response) ThunkContributorDashboard.assignedClips = result.response.data;
        }
    )
}