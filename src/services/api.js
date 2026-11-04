import { API_URL } from "../config";
import cursosMock from "../data/cursosMock";
import videosMock from "../data/videosMock";

async function buscarJson(caminho) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60000);

    try {
        const resposta = await fetch(`${API_URL}${caminho}`, { signal: controller.signal });
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
        return await resposta.json();
    } catch (erro) {
        throw erro;
    } finally {
        clearTimeout(timer);
    }
}

export async function buscarCursos() {
    try {
        const cursos = await buscarJson("/cursos");
        return {
            origem: "servidor",
            dados: cursos.map((curso) => ({
                ...curso,
                professor: curso.usuario?.nome ?? "A definir",
            })),
        };
    } catch (erro) {
        return { origem: "exemplo", dados: cursosMock };
    }
}

export async function buscarVideos(cursoId) {
    try {
        const videos = await buscarJson(`/videos?curso_id=${cursoId}`);
        return { origem: "servidor", dados: videos };
    } catch (erro) {
        return {
            origem: "exemplo",
            dados: videosMock.filter((video) => video.curso_id === cursoId),
        };
    }
}