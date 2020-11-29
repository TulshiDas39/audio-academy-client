import { createAsyncThunk } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { ApiRoutes, AuthStorage, EnumLocalStoreKey, IThunkParam } from '../../lib';
import {IEntityUser} from '../../lib/types/entities'
import { Intercept } from '../../lib/utils/interceptor';
import { ActionAppReset } from '../../store/rootReducer';
import { ActionLogin } from './reducer';
export class ThunkLogin{
    private static GetProfileResponse:IEntityUser = AuthStorage.getValue(EnumLocalStoreKey.PROFILE);

    static get Profile(){
      return ThunkLogin.GetProfileResponse;
    }
    
    static GetProfile = createAsyncThunk(
        ApiRoutes.MyProfile,
        async (param?:IThunkParam<void,IEntityUser>) => {
          if(param?.updatedResponse) {
            AuthStorage.setValue(EnumLocalStoreKey.PROFILE,param.updatedResponse);
            ThunkLogin.GetProfileResponse = param.updatedResponse;
            return;
          }
          const result = await Intercept.get<IEntityUser>(ApiRoutes.MyProfile)
          result.response?.data && (ThunkLogin.GetProfileResponse = ThunkLogin.GetProfileResponse);
        }
    )

    static Logout= createAsyncThunk('app/logout',
      async (_,thunkApi)=>{
        batch(()=>{
          thunkApi.dispatch(ActionAppReset())
          thunkApi.dispatch(ActionLogin.setLoginState(false));
        })
    })

}