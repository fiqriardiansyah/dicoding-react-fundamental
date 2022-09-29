import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Apis from "../../service/apis";

import useFetchState from "../../hooks/useFetchState";

import LoadingSpinner from "../../components/loading-spinner";
import Alert from "../../components/alert";
import Input from "../../components/inputs/input";
import Header from "../../components/layout/header";
import { DANGER, SUCCESS } from "../../utils/const";
import useLocale from "../../hooks/useLocale";

function SignUp() {
    const [formError, setFormError] = useState(null);
    const signUp = useFetchState();
    const navigate = useNavigate();
    const localeText = useLocale();

    const onSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const passwordRepeat = e.target["password-repeat"].value;

        if (!name.trim() || !email.trim() || !password || !passwordRepeat) {
            return;
        }
        if (password !== passwordRepeat) {
            setFormError(localeText("password_not_same"));
            return;
        }

        signUp.fetchStart();
        Apis.signup({ name, email, password })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    signUp.fetchSuccess(res.data?.message);
                    setTimeout(() => {
                        navigate("/signin");
                    }, 1000);
                    return;
                }
                signUp.fetchFailed(
                    res?.response?.data?.message || localeText("default_error"),
                );
            })
            .catch((err) => {
                signUp.fetchFailed(
                    err?.response?.data?.message || localeText("default_error"),
                );
            });
    };

    return (
        <div className="layout">
            <Header />
            <h2 className="text-text-primary dark:text-text-primary-dark dark:text-text-primary-dark text-2xl capitalize">
                {localeText("welcome_to_private_notes")}
            </h2>
            <p className="text-slate-400 capitalize">{localeText("sign_up")}</p>
            <form action="" className="mt-3 mb-5" onSubmit={onSubmit}>
                <Input
                    id="name"
                    name="name"
                    placeholder={localeText("your_name")}
                />
                <div className="h-3" />
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
                <div className="h-3" />
                <Input
                    id="password-repeat"
                    name="password-repeat"
                    type="password"
                    placeholder={localeText("repeat_password")}
                />
                <div className="h-2" />
                {formError && <Alert text={formError} type={DANGER} />}
                {signUp.error && <Alert text={signUp.error} type={DANGER} />}
                {signUp.data && <Alert text={signUp.data} type={SUCCESS} />}
                <button
                    disabled={signUp.loading}
                    type="submit"
                    className="mt-5 outline-1 outline text-text-primary dark:text-text-primary-dark outline-primary px-5 py-2 rounded-md bg-secondary dark:bg-secondary-dark  hover:bg-tertiary hover:dark:bg-tertiary-dark hover:text-text-primary hover:dark:text-text-primary-dark focus:bg-tertiary focus:dark:bg-tertiary-dark capitalize"
                >
                    {signUp.loading ? (
                        <LoadingSpinner />
                    ) : (
                        localeText("create_account")
                    )}
                </button>
            </form>
            <Link to="/signin" className="text-slate-400 underline capitalize">
                {localeText("already_have_an_account")}
            </Link>
        </div>
    );
}

export default SignUp;
