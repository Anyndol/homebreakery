import { createContext, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export const AuthContext = createContext({});

export default function AuthProvider(){
    const [userData, setUserData] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const { search } = useLocation();
    const code = new URLSearchParams(search).get('code');

    const getProfile = useCallback(async (login_on_failure = true) => {
        return fetch(`${import.meta.env.VITE_API_URL}/profile`, {method: 'GET', credentials: 'include'}).then(async (res)=> {
            if(res.status === 401 && login_on_failure) {
                window.location.replace(import.meta.env.VITE_DISCORD_REDIRECT_URL);
            } else if(res.status === 200) {
                const data = await res.json();
                setUserData(data);
            }
    })}, [setUserData]);

    useEffect(() => {
        if(code) {
            fetch(`${import.meta.env.VITE_API_URL}/login`, {method: 'POST', headers: new Headers({'content-type': 'application/json'}), body:JSON.stringify({code}), credentials: 'include'}).then(() => {
                getProfile().then(() => {
                    setInitialized(true);
                });
            });
        } else {
            getProfile(false).then(() => {
                setInitialized(true);
            });
        }
    }, [code, getProfile]);

    return (
        <AuthContext.Provider value={{userData, getProfile}}>
            {initialized && <Outlet />}
        </AuthContext.Provider>
    )
}