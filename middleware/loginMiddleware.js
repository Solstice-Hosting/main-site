import axios from "axios";
import { useState } from "react";

export default async function loginMiddleware(username, password, setProperError, setInfo, setSuccess, router) {
    if (!username || !password) {
        setProperError("Username or password not set");
        setSuccess(null);
        setInfo(null);
    } else {
            setSuccess(null);
            setProperError(null);
            setInfo("Loading...");
            // Fetch user's IP address from ipify
            const ipResponse = await axios.get("https://api.ipify.org?format=json");
            const userip = ipResponse.data.ip;

            // Now, make the login request with the username, password, and userip
            const response = await axios.post("/api/session/login/login", {
                username,
                password,
                userip
            });

            if (response.status === 200) {
                setInfo(null);
                setProperError(null);
                setSuccess(`Welcome, ${username}.`);
                setTimeout(() => {router.push('/dashboard')}, 1700);
                sessionStorage.setItem("sessionID", response.data.sessionUUID);
                sessionStorage.setItem("userUUID", response.data.userUUID);
            }
            else {
                setProperError(`Incorrect username or password`);
            }

    }
}
