import axios from "axios";

export const signIn = async (data) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/users/auth/signin",
            data
        );
        // axios sẽ trả kết quả về qua property của nó là data
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error sign In:", error);
        throw error;
    }
};
export const signUp = async (data) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/users/auth/signup",
            data
        );
        // axios sẽ trả kết quả về qua property của nó là data
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error sign up:", error);
        throw error;
    }
};
export const sendEmail = async (data) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/users/send-email",
            data
        );
        // axios sẽ trả kết quả về qua property của nó là data
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error sign up:", error);
        throw error;
    }
};
export const resetPassword = async (token, email, password) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/users/reset-password",
            {
                token,
                email,
                password,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};
export const signOut = async () => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/users/auth/signout",
            
        );
        return response;
        
    } catch (error) {
        console.error("Error sign out:", error);
        throw error;
    }
};

