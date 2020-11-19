
export enum EnumLocalStoreKey{
    TOKEN="token",
    PROFILE="profile"
}

export class AuthStorage{
    static getValue<T=string>(key:EnumLocalStoreKey):T{
        let value = localStorage[key];
        return value?JSON.parse(value):null;
    }
    static setValue(key:EnumLocalStoreKey,value:any){
        localStorage[key] = JSON.stringify(value);
    }
    static clearLoginData(){
        localStorage.removeItem(EnumLocalStoreKey.PROFILE);
        localStorage.removeItem(EnumLocalStoreKey.TOKEN);
    }

    static get isLoggedIn(){
        if( !!this.getValue(EnumLocalStoreKey.TOKEN) && !!this.getValue(EnumLocalStoreKey.PROFILE)){
            return true
        }
        else{
            this.clearLoginData();
            return false;
        }
    }
}