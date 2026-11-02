import test from "node:test";
import assert from "node:assert/strict";
import { species } from "../src/species.js";
import { filterSpecies } from "../src/app.js";

test("o catálogo contém espécies com os campos essenciais", () => {
  assert.ok(species.length >= 8);
  for (const item of species) {
    assert.ok(item.name);
    assert.ok(item.scientific);
    assert.ok(item.continent);
    assert.ok(item.status);
  }
});

test("a pesquisa encontra nomes comuns sem distinguir maiúsculas", () => {
  assert.equal(filterSpecies(species, { search: "GORILA" }).length, 1);
});

test("o filtro por continente devolve apenas espécies desse continente", () => {
  const results = filterSpecies(species, { continent: "Ásia" });
  assert.ok(results.length > 0);
  assert.ok(results.every((item) => item.continent === "Ásia"));
});

test("os filtros podem ser combinados", () => {
  const results = filterSpecies(species, { continent: "África", status: "Criticamente em perigo" });
  assert.ok(results.every((item) => item.continent === "África" && item.status === "Criticamente em perigo"));
});

test("a pesquisa sem resultados devolve uma lista vazia", () => {
  assert.deepEqual(filterSpecies(species, { search: "animal-inventado" }), []);
});
