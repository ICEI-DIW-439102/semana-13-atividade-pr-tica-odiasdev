// Configuração da API
const API_URL = "http://localhost:3000/servicos";

/**
 * Busca todos os serviços da API
 */
async function fetchItems() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return [];
  }
}

/**
 * Cria o elemento HTML de um card a partir de um item
 */
function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <div class="card-image-wrapper">
      <img src="${item.imagem}" alt="${item.nome}" class="card-image" />
      ${item.destaque ? '<span class="badge-destaque">Destaque</span>' : ""}
    </div>
    <div class="card-body">
      <span class="card-categoria">${item.categoria}</span>
      <h3 class="card-titulo">${item.nome}</h3>
      <p class="card-descricao">${item.descricaoCurta}</p>
      <div class="card-footer">
        <span class="card-preco">R$ ${item.valor},00<small> · ${item.duracao} min</small></span>
        <a href="details.html?id=${item.id}" class="btn-detalhes">Ver detalhes</a>
      </div>
    </div>
  `;

  return card;
}

/**
 * Renderiza a lista de cards no container
 */
function renderCards(items) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  if (!items || items.length === 0) {
    container.innerHTML = '<p class="loading">Nenhum serviço encontrado.</p>';
    return;
  }

  items.forEach((item) => {
    const card = createCard(item);
    container.appendChild(card);
  });
}

/**
 * Inicialização: busca os dados e renderiza
 */
async function init() {
  const items = await fetchItems();
  renderCards(items);
}

document.addEventListener("DOMContentLoaded", init);
