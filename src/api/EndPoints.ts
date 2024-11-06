import { API_BASE_URL } from "constants/Constants";
const USER_SERVICE = API_BASE_URL + "/user/";
const END_POINTS = {
    USER: {
        LOGIN: `${USER_SERVICE}login`,
    }
}
export default END_POINTS;