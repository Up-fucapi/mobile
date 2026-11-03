async function SignUp({ user = {} }) {
    const { username, email, password } = user;
    const response = await fetch("https://choises-techdemo.onrender.com/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            email,
            password
        }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao execultar o login");
    }
    return data
}

export default SignUp