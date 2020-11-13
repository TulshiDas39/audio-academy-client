
export type TAuthStorage={
    token?:string;
}

type keys = keyof TAuthStorage;

export class AuthStorage{
    static getValue(key:keys){
        return localStorage[key];
    }
    static setValue(key:keys,value:string){
        localStorage[key] = value;
    }
    static get isLoggedIn(){
        return !!this.getValue("token");
    }
}