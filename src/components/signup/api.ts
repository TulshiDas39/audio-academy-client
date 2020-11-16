import { ApiRoutes } from "../../lib"
import { IEntityUser } from "../../lib/types/entities"
import { Intercept } from "../../lib/utils/interceptor"
import { IApiSignUpRequest, IApiSignUpResponse } from "./typing/apiModels"

export const apiSignUp=(requestModel:IApiSignUpRequest)=>{
    return Intercept.post<IApiSignUpResponse>(ApiRoutes.Signup,requestModel)
}