import React, { createContext, useEffect, useMemo, useState } from "react";
import { ACCESS_TOKEN } from "../utils/const";
import Apis from "../service/apis";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState({
        accessToken: localStorage.getItem(ACCESS_TOKEN),
        data: null,
    });

    const saveAccessToken = (accessToken) => {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        setUser((prev) => ({
            ...prev,
            accessToken,
        }));
    };

    const getUserSignInFetcher = () => {
        Apis.getUserSignin().then((res) => {
            setUser((prev) => ({
                ...prev,
                data: res.data?.data,
            }));
        });
    };

    useEffect(() => {
        if (!user.accessToken) return;
        getUserSignInFetcher();
    }, [user.accessToken]);

    const value = useMemo(() => ({ user, setUser, saveAccessToken }), [user]);
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export { UserContext, UserProvider };
