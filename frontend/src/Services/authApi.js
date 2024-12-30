import api from "./api";

const register = async (username, password) => {
    return await api.post("/auth/registration", {
        username,
        password,
    });
};

const login = async (username, password) => {
    return await api.post("/auth/login", {
        username,
        password,
    },
        {
            withCredentials: true,
        });
};

const authStatus = async () => {
    return await api.get("/auth/status", {
        withCredentials: true,
    }
    )
}

const logout = async  () => {
    return await api.post("/auth/logout", 
        { },
        {
            withCredentials: true,
        }
    )
}

const setup2FA = async () => {
    return await api.post("/auth/2FA/setup",
        {},
        {
            withCredentials: true,
        }
    )
}

const verify2FA = async (token) => {
    return await api.post("/auth/2FA/verify", 
        {token},
        {
            withCredentials: true,
        }
    )
}

const reset2FA = async () => {
    return await api.post("/auth/2FA/reset", 
        {},
        {
            withCredentials: true,
        }
    )
}

const authServices = {
    register,
    login,
    authStatus,
    logout,
    setup2FA,
    verify2FA,
    reset2FA
}

export default authServices