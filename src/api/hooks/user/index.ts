import END_POINTS from "api/EndPoints";
import API from "api/Instance";
export const Login = async (email: string, password: string) => {
    const URL = END_POINTS.USER.LOGIN
    return await API.POST(URL, { email, password });
}