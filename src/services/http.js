import { API_URL } from "../config";

// O plano gratuito do Render "dorme" e a primeira requisição pode levar ~50s.
const TIMEOUT_MS = 60000;

export async function postJson(caminho, corpo) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const resposta = await fetch(`${API_URL}${caminho}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpo),
            signal: controller.signal,
        });

        let dados = null;
        try {
            dados = await resposta.json();
        } catch (e) {
            // resposta sem JSON
        }

        if (!resposta.ok) {
            throw new Error(dados?.message || dados?.mensagem || `Erro ${resposta.status}`);
        }
        return dados;
    } catch (erro) {
        if (erro.name === "AbortError") {
            throw new Error("O servidor demorou para responder. Tente novamente em instantes.");
        }
        if (erro instanceof TypeError) {
            throw new Error("Não foi possível conectar ao servidor. Verifique sua internet.");
        }
        throw erro;
    } finally {
        clearTimeout(timer);
    }
}
