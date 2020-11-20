
export class UiRoutes{
    static Root='/';

    static ContributorDashBoard = UiRoutes.Root;

    static Login = UiRoutes.Root;
    static ForgotPassword = UiRoutes.Login+"recover";

    static ResetPassword = '/reset';

    static SingUp = '/signup'

    static Privacy = '/privacy';

    static Submitted = '/submitted';
    static Confirmed = '/confirmed';
}

export const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://[::1]:3000";

export class ApiRoutes{

    private static Auth = API_BASE_URL+'/auth';
    static Login = ApiRoutes.Auth+'/login';
    static Signup=ApiRoutes.Auth+'/signup';

    private static User = API_BASE_URL+'/user';
    static MyProfile = ApiRoutes.User;
}