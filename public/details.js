const API_URL = "http://localhost:3000/servicos";

/**
 * Renderiza uma mensagem de erro/aviso no container
 */
function renderMessage(titulo, mensagem) {
  const container = document.getElementById("details-container");
  container.innerHTML = `
    <div class="erro-box">
      <h2>${titulo}</h2>
      <p>${mensagem}</p>
      <a href="index.html" class="btn-detalhes">Voltar para a Home</a>
    </div>
  `;
}

/**
 * Busca um item específico pelo id
 */
async function fetchItemById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar item:", error);
    return null;
  }
}

/**
 * Renderiza os detalhes do item
 */
function renderDetails(item) {
  const container = document.getElementById("details-container");

  const tagsHtml = item.tags
    .map((tag) => `<span class="chip">${tag}</span>`)
    .join("");

  container.innerHTML = `
    <div class="details-card">
      <div class="details-image-wrapper">
        <img src="${item.imagem}" alt="${item.nome}" class="details-image" />
        ${item.destaque ? '<span class="badge-destaque">Destaque</span>' : ""}
      </div>
      <div class="details-info">
        <span class="card-categoria">${item.categoria}</span>
        <h2 class="details-titulo">${item.nome}</h2>
        <p class="details-endereco">⏱️ Duração aproximada: ${item.duracao} min</p>
        <div class="details-preco">
          R$ ${item.valor},00<small>/sessão</small>
        </div>
        <h3 class="details-subtitulo">Sobre o serviço</h3>
        <p class="details-descricao">${item.descricaoCompleta}</p>
        <h3 class="details-subtitulo">O que inclui</h3>
        <div class="chips-container">${tagsHtml}</div>
        <button class="btn-reservar">Agendar agora</button>
      </div>
    </div>
  `;
}

/**
 * Inicialização: lê o id da URL, busca o item e renderiza
 */
async function init() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    renderMessage(
      "ID não informado",
      "Nenhum identificador de serviço foi passado na URL. Volte para a lista e selecione um serviço."
    );
    return;
  }

  const item = await fetchItemById(id);

  if (!item) {
    renderMessage(
      "Serviço não encontrado",
      `Não foi possível localizar um serviço com o ID ${id}. Talvez ele tenha sido removido.`
    );
    return;
  }

  renderDetails(item);
}

document.addEventListener("DOMContentLoaded", init);
