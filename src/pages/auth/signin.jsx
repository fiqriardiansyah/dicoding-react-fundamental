import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Apis from "../../service/apis";

import { UserContext } from "../../context/user";

import useFetchState from "../../hooks/useFetchState";

import LoadingSpinner from "../../components/loading-spinner";
import Alert from "../../components/alert";
import Input from "../../components/inputs/input";
import Header from "../../components/layout/header";
import { DANGER, SUCCESS } from "../../utils/const";
import useLocale from "../../hooks/useLocale";

function SignIn() {
    const signIn = useFetchState();
    const localeText = useLocale();

    const { saveAccessToken } = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!email.trim() || !password) {
            return;
        }

        signIn.fetchStart();
        Apis.signin({ email, password })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    signIn.fetchSuccess(res.data?.message);
                    setTimeout(() => {
                        saveAccessToken(res.data?.data?.accessToken);
                    }, 1000);
                    return;
                }
                signIn.fetchFailed(
                    res?.response?.data?.message || localeText("default_error"),
                );
            })
            .catch((err) => {
                signIn.fetchFailed(
                    err?.response?.data?.message || localeText("default_error"),
                );
            });
    };

    return (
        <div className="layout">
            <Header />
            <h2 className="text-white text-2xl capitalize">
                {localeText("welcome_back")}
            </h2>
            <p className="text-slate-400 capitalize">{localeText("sign_in")}</p>
            <form action="" className="mt-3 mb-5" onSubmit={onSubmit}>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={localeText("your_email")}
                />
                <div className="h-3" />
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={localeText("your_password")}
                />
                <div className="h-2" />
                {signIn.error && <Alert text={signIn.error} type={DANGER} />}
                {signIn.data && <Alert text={signIn.data} type={SUCCESS} />}
                <button
                    disabled={signIn.loading}
                    type="submit"
                    className="mt-5 outline-1 outline text-white outline-primary px-5 py-2 rounded-md bg-secondary hover:bg-tertiary hover:text-white focus:bg-tertiary capitalize"
                >
                    {signIn.loading ? (
                        <LoadingSpinner />
                    ) : (
                        localeText("sign_in")
                    )}
                </button>
            </form>
            <Link to="/signup" className="text-slate-400 underline capitalize">
                {localeText("dont_have_an_account")}
            </Link>
        </div>
    );
}

export default SignIn;
