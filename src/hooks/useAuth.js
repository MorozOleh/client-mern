import { useState, useEffect, useCallback } from "react";

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken,
            userId: id
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storageName)
    }, [])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            const { token, userId } = data
            login(token, userId)
        }

    }, [login])


    return { isAuthenticated, userId, token, logout, login }
}