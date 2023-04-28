import axios from "axios";

const API_URL = "/api/users/";

// Register
const register = async (userData) => {
    const response = await axios.post(API_URL + "register", userData)
    if(response.data.success === true)
        localStorage.setItem("user", JSON.stringify(response.data.data))
    return response.data.data;
}

const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)
    if(response.data.success === true)
        localStorage.setItem("user", JSON.stringify(response.data.data))
    return response.data.data;
}

// Logout
const logout = async () => {
    const response = await axios.get(API_URL + "logout", {withCredentials: true});
    localStorage.removeItem("user");
}

const authService = {
    register, login, logout
}
export default authService;