import axios from "axios";
const  API_URL = "/url/api/users";

// Register user
const register = async (userData) => {
    const res = await axios.post(API_URL, userData);
    if(res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    }
}

// Login user
const login = async (userData) => {
    const res = await axios.post(API_URL + "/login", userData);
    if(res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
    }
}

const authService = {register, login};

export default authService;