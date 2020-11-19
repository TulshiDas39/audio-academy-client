import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoutes, IThunkParam } from '../../lib';
import {IEntityUser} from '../../lib/types/entities'
import { Intercept } from '../../lib/utils/interceptor';
export class ThunkLogin{
    private static GetProfileResponse:IEntityUser;

    static get Profile(){
      return ThunkLogin.GetProfileResponse;
    }
    
    static GetProfile = createAsyncThunk(
        ApiRoutes.MyProfile,
        async (param?:IThunkParam<void,IEntityUser>) => {
          if(param?.updatedResponse) return param.updatedResponse;
          const result = await Intercept.get<IEntityUser>(ApiRoutes.MyProfile)
          result.response?.data && (ThunkLogin.GetProfileResponse = ThunkLogin.GetProfileResponse);
        }
    )

}