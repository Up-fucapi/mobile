async function SignIn({ user = {} }) {
    const { email, password } = user;
    const response = await fetch("https://choises-techdemo.onrender.com/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
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

export default SignIn