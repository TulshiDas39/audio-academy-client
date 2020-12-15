
export class UiRoutes{
    static Root='/';

    static ContributorDashBoard = UiRoutes.Root;

    static Login = UiRoutes.Root;
    static ForgotPassword = UiRoutes.Login+"recover";
    static ResetPassword = '/reset';
    static SingUp = '/signup'

    static Privacy = '/privacy';

    static AdminDashBoard = UiRoutes.Root;
    static Acitivity = UiRoutes.Root+"activity";


    static Submitted = '/submitted';
    static Confirmed = '/confirmed';
    static Tutorials = '/tutorials';

}

export const API_BASE_URL = process.env.REACT_APP_BASE_URL || "http://[::1]:3000";

export class ApiRoutes{

    private static Auth = API_BASE_URL+'/auth';
    static Login = ApiRoutes.Auth+'/login';
    static Signup=ApiRoutes.Auth+'/signup';
    static CreateContributor=ApiRoutes.Auth+'/createContributor';

    private static User = API_BASE_URL+'/user';
    static MyProfile = ApiRoutes.User;

    static Clip = API_BASE_URL+'/clip';
    static AssignedClip = ApiRoutes.Clip+'/assigned';
    static SubmittedClip = ApiRoutes.Clip+'/submitted';
    static SubmitClip = ApiRoutes.Clip+'/submit';

    static Tutorial = API_BASE_URL+"/tutorial";
    static CreateTutorial = ApiRoutes.Tutorial+"/create";
    static TutorialSearch = ApiRoutes.Tutorial+"/search";
    static TutorialAll = ApiRoutes.Tutorial+"/all";

    static Book = API_BASE_URL+'/book';
    static BookSearch = ApiRoutes.Book+"/search";    
}