import axios from "axios";
const  API_URL = "/url/api/users";

// Register user
const register = async (userData) => {
    const res = await axios.post(API_URL, userData);
    if(res.data) {
        // localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    }
}

// Verify email link
const verifyEmailLink = async (userId, uniqueString) => {
    const response = await axios.get(API_URL + `/verify/${userId}/${uniqueString}`);
    return response.data;
}

// Login user
const login = async (userData) => {
    const res = await axios.post(API_URL + "/login", userData);
    if(res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    }
}

const authService = {register, login, verifyEmailLink};

export default authService;