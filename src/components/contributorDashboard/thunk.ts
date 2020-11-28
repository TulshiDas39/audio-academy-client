import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiRoutes, IThunkParam } from "../../lib";
import { IClipEntity } from "../../lib/types/entities";
import { Intercept } from "../../lib/utils/interceptor";

export class ThunkContributorDashboard{
    private static allClips:IClipEntity[]=[];
    static get AllClips(){
        return ThunkContributorDashboard.allClips;
    }
    static GetAllClip = createAsyncThunk(
        ApiRoutes.AssignedClip,
        async (param?:IThunkParam<null,IClipEntity[]>) => {
          if(param?.updatedResponse) {
            ThunkContributorDashboard.allClips = param.updatedResponse;
            return;
          }
          const result = await Intercept.get<IClipEntity[]>(ApiRoutes.Clip);
          if(result.response) ThunkContributorDashboard.allClips = result.response.data;
        }
    )
}