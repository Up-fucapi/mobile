import { postJson } from "../../../services/http";

async function SignIn({ user = {} }) {
    const { email, password } = user;

    // O backend espera "email" e "senha"
    return postJson("/signin", {
        email: (email ?? "").trim().toLowerCase(),
        senha: password,
    });
}

export default SignIn
