# Guia do projeto

## Objetivo

O Mundo dos Macacos é um catálogo educativo para apresentar espécies de primatas, os seus habitats, alimentação e estado de conservação.

## Utilização

1. Abrir `index.html` num navegador moderno.
2. Percorrer os cartões das espécies.
3. Pesquisar pelo nome comum, nome científico, habitat ou curiosidade.
4. Combinar os filtros de continente e conservação.

## Organização do código

- `src/species.js`: conjunto de dados utilizado pelo catálogo.
- `src/app.js`: filtros, criação segura dos cartões e atualização da interface.
- `tests/species.test.js`: testes da pesquisa e dos filtros.
- `styles.css`: estilos responsivos.

## Nota sobre conservação

Os estados de conservação são apresentados como informação educativa e devem ser confirmados na Lista Vermelha da IUCN antes de uma utilização científica. As classificações podem mudar com novas avaliações.
