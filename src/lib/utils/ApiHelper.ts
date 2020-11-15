import { UiRoutes } from '.';
import { IAxiosErrorModel, IRequestFailedModel } from '../types';
import { AuthStorage } from './AuthStorage';

export class ApiHelpers {

    static defaultRequestConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    static getAuthorizedRequestConfig = () => {
        let token = AuthStorage.getValue("token");
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    }

    static handleHttpFailed(error?: IAxiosErrorModel) {
        let errorData:IRequestFailedModel={
            error:error,
            message:error?.data.message ||  "Request Failed",
            statusCode:error?.status
        }

        if (errorData?.statusCode === 401) {
            if (window.location.pathname !== UiRoutes.Login) {
                localStorage.clear();
                window.location.pathname = UiRoutes.Login;
            }
        }
        return errorData;
    }

}