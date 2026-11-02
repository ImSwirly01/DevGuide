import { species } from "./species.js";

const grid = document.querySelector("#species-grid");
const search = document.querySelector("#search");
const continent = document.querySelector("#continent");
const status = document.querySelector("#status");
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");

function card(item) {
  const article = document.createElement("article");
  article.className = "species-card";
  const emoji = document.createElement("div");
  emoji.className = "animal";
  emoji.textContent = "🐒";
  emoji.setAttribute("aria-hidden", "true");
  const title = document.createElement("h3");
  title.textContent = item.name;
  const scientific = document.createElement("p");
  scientific.textContent = item.scientific;
  const detail = document.createElement("p");
  detail.textContent = item.fact;
  const tags = document.createElement("div");
  tags.className = "meta";
  for (const value of [item.continent, item.status]) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = value;
    tags.append(tag);
  }
  article.append(emoji, title, scientific, detail, tags);
  return article;
}

export function filterSpecies(items, filters = {}) {
  const term = (filters.search ?? "").trim().toLocaleLowerCase("pt");
  return items.filter((item) => {
    const searchable = [item.name, item.scientific, item.habitat, item.fact].join(" ").toLocaleLowerCase("pt");
    return (!term || searchable.includes(term))
      && (!filters.continent || filters.continent === "todos" || item.continent === filters.continent)
      && (!filters.status || filters.status === "todos" || item.status === filters.status);
  });
}

function render() {
  const results = filterSpecies(species, {
    search: search.value,
    continent: continent.value,
    status: status.value
  });
  grid.replaceChildren(...results.map(card));
  count.textContent = `${results.length} de ${species.length} espécies`;
  empty.hidden = results.length !== 0;
}

for (const control of [search, continent, status]) control.addEventListener("input", render);
render();
