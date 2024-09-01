import { createContext, useEffect, useState } from "react";
import { User } from "./types/type";

const AuthContext = createContext({
    login: (token: string, user: User) => {},
    logout: () => {},
    isLoggedin: false,
    showApply: false,
    setShowApply: (val: boolean) => {},
    user: null as User | null
});


/*
    1. there is token in ls
    2. hit /api/user/me/:id with token in headers
    3. if token is valid, it will return user data
    4. now token is valid so set isLoggedIn to true
    5. if token is invalid, it will return 401 set isLoggedIn to false, clear token,user from ls.
    

*/
function AuthProvider({children}: {
    children: React.ReactNode
}){

    const [storedToken, setStoredToken] = useState<string | null>(null);
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [showApply, setShowApply] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    

    const login = (token: string, user: User) => {
        setStoredToken(token);
        setIsLoggedin(true)
        setUser(user);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if(token && user){
            login(token, JSON.parse(user));
        }
    }, [])

    const logout = () => {
        setStoredToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedin(false)
        setUser(null);
        

    }
    return (
        <AuthContext.Provider value={{ login, logout, isLoggedin, showApply, setShowApply, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext}