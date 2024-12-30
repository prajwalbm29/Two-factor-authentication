import api from "./api";

export const register = async (username, password) => {
    return await api.post("/auth/registration", {
        username,
        password,
    });
};

export const login = async (username, password) => {
    return await api.post("/auth/login", {
        username,
        password,
    },
        {
            withCredentials: true,
        });
};

export const authStatus = async () => {
    return await api.get("/auth/status", {
        withCredentials: true,
    }
    )
}

export const logout = async  () => {
    return await api.post("/auth/logout", 
        { },
        {
            withCredentials: true,
        }
    )
}

export const setup2FA = async () => {
    return await api.post("/auth/2FA/setup",
        {},
        {
            withCredentials: true,
        }
    )
}

export const verify2FA = async (token) => {
    return await api.post("/auth/2FA/verify", 
        {token},
        {
            withCredentials: true,
        }
    )
}

export const reset2FA = async () => {
    return await api.post("/auth/2FA/reset", 
        {},
        {
            withCredentials: true,
        }
    )
}