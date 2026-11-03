import { useState } from "react";
import SignUp from "../service/signup.service.js";

function useSignUp(loading) {
    const handleSignUp = async (user) => {
        loading(true)
        try {
            const result = await SignUp(user)
            return result
        } finally {
            loading(false)
        }
    }
    return handleSignUp
}

export default useSignUp