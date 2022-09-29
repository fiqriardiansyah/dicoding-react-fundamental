import axios from "axios";
import utils from "../utils";
import { ACCESS_TOKEN, DEFAULT_ERROR_MESSAGE } from "../utils/const";

export const dicodingClient = axios.create();

axios.defaults.timeout = 10000;
axios.defaults.validateStatus = () => true;

const responseInterceptors = (res) => {
    const { status, data } = res;
    if (status < 200 && status >= 300) {
        throw Error(data?.message || DEFAULT_ERROR_MESSAGE);
    }
    if (status === 401) {
        utils.signout();
    }
    return res;
};

const responseInterceptorsError = (error) => {
    if (error.response?.status < 200 && error.response?.status >= 300) {
        throw Error(error.response.data?.message || DEFAULT_ERROR_MESSAGE);
    }
    if (error.response?.status === 401) {
        utils.signout();
    }
    return error;
};

const requestInterceptorsError = (error) => error;

dicodingClient.defaults.baseURL = process.env.REACT_APP_DICODING_BASE_URL;
dicodingClient.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN) || "";
    req.headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    return req;
}, requestInterceptorsError);
dicodingClient.interceptors.response.use(
    responseInterceptors,
    responseInterceptorsError,
);

export default {};
