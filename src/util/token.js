const TOKEN_KEY = "zy_token";

/**
 * Token管理工具，这里使用Cookie存储
 */
class TokenUtils {

    static getToken() {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    static setToken(token) {
        sessionStorage.setItem(TOKEN_KEY, token);
    }

    static removeToken() {
        sessionStorage.removeItem(TOKEN_KEY);
    }
}


export default TokenUtils;