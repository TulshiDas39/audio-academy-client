
export class UiRoutes{
    static Root='/';

    static DashBoard = UiRoutes.Root;

    static Login = UiRoutes.Root;
    static ForgotPassword = UiRoutes.Login+"recover";

    static SingUp = '/signup'

    static Privacy = '/privacy';

    static Saved = '/saved';
}

export const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://[::1]:3000";
export class ApiRoutes{

    private static Auth = API_BASE_URL+'/auth';
    static Login = ApiRoutes.Auth+'/login';
}