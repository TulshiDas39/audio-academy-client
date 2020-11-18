import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoutes, IThunkParam } from '../../lib';
import {IEntityUser} from '../../lib/types/entities'
import { Intercept } from '../../lib/utils/interceptor';
export class ThunkLogin{
    private static responseData:IEntityUser;

    static get response(){
      return ThunkLogin.responseData;
    }
    
    static thunk = createAsyncThunk(
        ApiRoutes.MyProfile,
        async (param?:IThunkParam<void,IEntityUser>) => {
          if(param?.updatedResponse) return param.updatedResponse;
          const result = await Intercept.get<IEntityUser>(ApiRoutes.MyProfile)
          result.response?.data && (ThunkLogin.responseData = ThunkLogin.responseData);
        }
    )

}