import { species } from "./species.js";

const hasDOM = typeof document !== "undefined";
const grid = hasDOM ? document.querySelector("#species-grid") : null;
const search = hasDOM ? document.querySelector("#search") : null;
const continent = hasDOM ? document.querySelector("#continent") : null;
const status = hasDOM ? document.querySelector("#status") : null;
const count = hasDOM ? document.querySelector("#result-count") : null;
const empty = hasDOM ? document.querySelector("#empty-state") : null;

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
  if (!hasDOM) return;
  const results = filterSpecies(species, {
    search: search.value,
    continent: continent.value,
    status: status.value
  });
  grid.replaceChildren(...results.map(card));
  count.textContent = `${results.length} de ${species.length} espécies`;
  empty.hidden = results.length !== 0;
}

if (hasDOM) {
  for (const control of [search, continent, status]) control.addEventListener("input", render);
  render();
}
