import React, { useContext, useMemo, useRef, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdLogOut } from "react-icons/io";
import { UserContext } from "../../context/user";
import useLocale from "../../hooks/useLocale";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import utils from "../../utils";
import LoadingSpinner from "../loading-spinner";

function Account() {
    const { user } = useContext(UserContext);
    const localeText = useLocale();

    const [showAccount, setShowAccount] = useState(false);

    const accountRef = useRef();

    useOnClickOutside(accountRef, () => {
        setShowAccount(false);
    });

    const signOutHandler = () => {
        utils.signout();
    };

    const buttonIcon = useMemo(() => {
        if (!user.accessToken) return "";
        return (
            <div className="ml-5">
                {user.data ? (
                    <button
                        onClick={() => setShowAccount(true)}
                        type="button"
                        className="text-white text-3xl"
                    >
                        <HiOutlineUserCircle />
                    </button>
                ) : (
                    <div className="w-12 h-12 flex items-center justify-center">
                        <LoadingSpinner />
                    </div>
                )}
            </div>
        );
    }, [user]);

    const menuAccount = useMemo(() => {
        if (showAccount) {
            return (
                <div
                    ref={accountRef}
                    className="absolute bg-white rounded flex flex-col top-14 right-0 z-10 max-w-[300px] overflow-hidden"
                >
                    <div className="w-full flex flex-col p-2 px-4">
                        <p className="capitalize max-1-line text-lg m-0">
                            {user.data.name}
                        </p>
                        <span className="text-slate-500 text-xs">
                            {user.data.email}
                        </span>
                    </div>
                    <button
                        onClick={signOutHandler}
                        type="button"
                        className="flex items-center text-lg p-3 hover:bg-slate-200"
                    >
                        <IoMdLogOut />
                        <p className="ml-3 capitalize">
                            {localeText("sign_out")}
                        </p>
                    </button>
                </div>
            );
        }
        return "";
    }, [showAccount]);

    return (
        <>
            {buttonIcon}
            {menuAccount}
        </>
    );
}

export default Account;
