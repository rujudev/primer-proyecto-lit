import { localized, msg, str } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PokeList } from './pokeList.js';
import { PokeItem, Species } from './services/pokemon.js';

type StatName = {
  hp: string;
  attack: string;
  defense: string;
  'special-attack': string;
  'special-defense': string;
  speed: string;
};

@customElement('poke-list-item')
@localized()
export class PokeListItem extends LitElement {
  @property({ type: Object }) pokeItem: PokeItem | null = null;

  static statsName = {
    hp: 'HP',
    attack: msg('Attack'),
    defense: msg('Defense'),
    'special-attack': msg('Special Attack'),
    'special-defense': msg('Special Defense'),
    speed: msg('Speed'),
  };

  static styles = css`
    /* Estilos generales */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Arial', sans-serif;
    }

    body {
      background-color: #f5f5f5;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }

    /* Grid de Pokémon */
    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    /* Tarjeta de Pokémon */
    .pokemon-card {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .pokemon-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    /* Imagen del Pokémon */
    .pokemon-image {
      background-color: #f0f0f0;
      padding: 20px;
      text-align: center;
    }

    .pokemon-image img {
      width: 120px;
      height: 120px;
      object-fit: contain;
    }

    /* Información del Pokémon */
    .pokemon-info {
      padding: 20px;
    }

    .pokemon-name {
      font-size: 1.5rem;
      margin-bottom: 10px;
      color: #333;
    }

    /* Tipos de Pokémon */
    .pokemon-type {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    .type {
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.8rem;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
    }

    .normal {
      background-color: #a8a878;
    }

    .fire {
      background-color: #f08030;
    }

    .water {
      background-color: #6890f0;
    }

    .electric {
      background-color: #f8d030;
    }

    .grass {
      background-color: #78c850;
    }

    .ice {
      background-color: #98d8d8;
    }

    .fighting {
      background-color: #c03028;
    }

    .poison {
      background-color: #a040a0;
    }

    .ground {
      background-color: #e0c068;
    }

    .flying {
      background-color: #a890f0;
    }

    .psychic {
      background-color: #f85888;
    }

    .bug {
      background-color: #a8b820;
    }

    .rock {
      background-color: #b8a038;
    }

    .ghost {
      background-color: #705898;
    }

    .dragon {
      background-color: #7038f8;
    }

    .dark {
      background-color: #705848;
    }

    .steel {
      background-color: #b8b8d0;
    }

    .fairy {
      background-color: #ee99ac;
    }

    /* Estadísticas */
    .pokemon-stats {
      margin-bottom: 15px;
    }

    .stat {
      margin-bottom: 8px;
    }

    .stat-name {
      font-weight: bold;
      font-size: 0.9rem;
    }

    .stat-value {
      float: right;
      font-size: 0.9rem;
    }

    .stat-bar {
      height: 8px;
      background-color: #eee;
      border-radius: 4px;
      margin-top: 5px;
      overflow: hidden;
    }

    .stat-fill {
      height: 100%;
      border-radius: 4px;
    }

    .hp {
      background-color: #ff5959;
    }

    .attack {
      background-color: #f5ac78;
    }

    .defense {
      background-color: #fae078;
    }

    .speed {
      background-color: #fa92b2;
    }

    /* Habilidades */
    .pokemon-abilities h3 {
      font-size: 1rem;
      margin-bottom: 8px;
    }

    .pokemon-abilities ul {
      list-style-position: inside;
      font-size: 0.9rem;
    }

    .pokemon-abilities li {
      margin-bottom: 3px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .pokemon-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }
    }

    @media (max-width: 480px) {
      .pokemon-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <li class="pokemon-card">
        <div class="pokemon-image">
          <img
            src=${this.pokeItem?.sprites.front_default || ''}
            alt=${this.pokeItem?.name || ''}
          />
        </div>
        <div class="pokemon-info">
          <h2 class="pokemon-name">${this.pokeItem?.name}</h2>
          <!-- Tipo de pokemon -->
          ${this.pokeItem?.types.map(
            ({ type }) => html`
              <div class="pokemon-type">
                <span class="type ${type.name.toLowerCase()}"
                  >${type.name}</span
                >
              </div>
            `,
          )}
          <!-- Estadísticas -->
          <div class="pokemon-stats">
            ${this.pokeItem?.stats.map(
              ({ base_stat, stat }) => html`
                <div class="stat">
                  <span class="stat-name"
                    >${PokeListItem.statsName[
                      stat.name as keyof StatName
                    ]}:</span
                  >
                  <span class="stat-value">${base_stat}</span>
                  <div class="stat-bar">
                    <div
                      class="stat-fill hp"
                      style="width: ${base_stat}%;"
                    ></div>
                  </div>
                </div>
              `,
            )}
          </div>
          <!-- Habilidades -->
          <div class="pokemon-abilities">
            <h3>Habilidades:</h3>
            <ul>
              ${this.pokeItem?.abilities.map(
                ({ ability }) => html` <li>${msg(str`${ability.name}`)}</li> `,
              )}
            </ul>
          </div>
        </div>
      </li>
    `;
  }
}
