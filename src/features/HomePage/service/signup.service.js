import { postJson } from "../../../services/http";

async function SignUp({ user = {} }) {
    const { username, email, password } = user;

    // O backend espera "nome", "email" e "senha"
    return postJson("/signup", {
        nome: (username ?? "").trim(),
        email: (email ?? "").trim().toLowerCase(),
        senha: password,
    });
}

export default SignUp
