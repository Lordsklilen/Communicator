import Cookies from 'universal-cookie';
const cookies = new Cookies();

export  class CookiesManager {

    static AddCookie(key: string, value: string) {
        cookies.set(key,value, { path: '/' });
        console.log(cookies.get(key));
    }

    static GetCookie(key: string) {
        return cookies.get(key);
    }

    static FillUserName(userName: string) {
        cookies.set("UserName", userName, { path: '/' });
    }

    static GetUserName() {
        return cookies.get("UserName");
    }
}
