import { useState } from "react";
import SignIn from "../service/signin.service.js";

function useSignIn(loading) {
    const handleSignIn = async (user) => {
        loading(true)
        try {
            const result = await SignIn(user)
            return result
        } finally {
            loading(false)
        }
    }
    return handleSignIn
}

export default useSignIn