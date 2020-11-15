import { UiRoutes } from "./Routes";

export class LayoutRoutes{

    private static PublicLayout=[
        UiRoutes.Privacy,
        UiRoutes.ResetPassword,
    ]

    static Public = `(${LayoutRoutes.PublicLayout.join("|")})`;

}