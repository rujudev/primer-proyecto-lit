import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { PokeItem, PokeListItem } from './services/pokemon.js';

import { msg } from '@lit/localize';
import './pokeListItem.js';

const ORDER = {
  HP: 'hp',
};

const FILTER = {
  TYPE: 'type',
};

@customElement('poke-list')
export class PokeList extends LitElement {
  static styles = css`
    main {
      display: flex;
      flex-direction: column;

      width: 100%;
    }

    ul {
      list-style: none;
      padding: 0;
      width: 100%;

      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-content: space-between;
      gap: 2rem;
    }

    .selects-wrapper {
      max-width: 100%;
      width: 100%;
    }

    .select-container {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    select {
      width: 100%;
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      font-size: 16px;
      color: #333;
      appearance: none;
      background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
      background-repeat: no-repeat;
      background-position: right 10px center;
      background-size: 12px;
    }

    select:hover {
      border-color: #999;
    }

    select:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
      outline: none;
    }

    @media (min-width: 768px) {
      .selects-wrapper {
        display: flex;
        gap: 20px;
      }

      .select-container {
        flex: 1;
      }
    }
  `;

  @state()
  @property({ type: Array })
  pokeList: PokeListItem[] = [];

  @state()
  data: PokeItem[] = [];

  private static _statsName: Record<string, string> | null = null;
  private static _abilitiesName: Record<string, string> | null = null;
  private static _typesName: Record<string, string> | null = null;

  @state()
  private orderValue: string = '';
  private ordersValue: string[] = [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
  ];

  @state()
  private filterValue: string = '';
  private filtersValue: string[] = [
    'bug',
    'fire',
    'flying',
    'grass',
    'normal',
    'poison',
    'water',
  ];

  static getStatsName(statName: string) {
    if (!this._statsName) {
      this._statsName = {
        hp: 'HP',
        attack: msg('Attack'),
        defense: msg('Defense'),
        'special-attack': msg('Special Attack'),
        'special-defense': msg('Special Defense'),
        speed: msg('Speed'),
      };
    }

    return this._statsName[statName];
  }

  static getAbilityName(abilityName: string) {
    if (!this._abilitiesName) {
      this._abilitiesName = {
        'big-pecks': msg('big-pecks'),
        blaze: msg('blaze'),
        chlorophyll: msg('chlorophyll'),
        'compound-eyes': msg('compound-eyes'),
        guts: msg('guts'),
        hustle: msg('hustle'),
        'keen-eye': msg('keen-eye'),
        overgrow: msg('overgrow'),
        'rain-dish': msg('rain-dish'),
        'run-away': msg('run-away'),
        'shed-skin': msg('shed-skin'),
        'shield-dust': msg('shield-dust'),
        sniper: msg('sniper'),
        'solar-power': msg('solar-power'),
        swarm: msg('swarm'),
        'tangled-feet': msg('tangled-feet'),
        'tinted-lens': msg('tinted-lens'),
        torrent: msg('torrent'),
      };
    }

    return this._abilitiesName[abilityName];
  }

  static getTypesName(typeName: string) {
    if (!this._typesName) {
      this._typesName = {
        bug: msg('bug'),
        fire: msg('fire'),
        flying: msg('flying'),
        grass: msg('grass'),
        normal: msg('normal'),
        poison: msg('poison'),
        water: msg('water'),
      };
    }

    return this._typesName[typeName];
  }

  connectedCallback(): void {
    super.connectedCallback();

    // this.pokeList.forEach(item => {
    //   console.log(item);
    //   item.types.forEach(({ type }) => {
    //     types = {
    //       ...types,
    //       [`${type.name}`]: type.name,
    //     };
    //   });
    // });

    this.data = this._mapPokeList();
  }

  private _mapPokeList(): PokeItem[] {
    return this.pokeList.map(({ sprites, name, types, stats, abilities }) => {
      return {
        name,
        sprite: sprites.front_default,
        types: types.map(({ type }) => ({
          id: type.name.toLowerCase(),
          literal: PokeList.getTypesName(type.name),
        })),
        stats: stats.map(({ base_stat: baseStat, stat }) => ({
          id: stat.name.toLowerCase(),
          literal: PokeList.getStatsName(stat.name),
          baseStat,
        })),
        abilities: abilities.map(({ ability }) => ({
          id: ability.name.toLowerCase(),
          literal: PokeList.getAbilityName(ability.name),
        })),
      };
    });
  }

  private _orderDataByStats(data: PokeItem[], value: string) {
    return [...data].sort((a, b) => {
      const valueA = a.stats.find(stat => stat.id === value)?.baseStat || 0;
      const valueB = b.stats.find(stat => stat.id === value)?.baseStat || 0;

      return valueB - valueA;
    });
  }

  private _filterByType(data: PokeItem[], type: string) {
    return [...data].filter(item => item.types.find(({ id }) => id === type));
  }

  private _handleChangeOrder(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    let arrAux = this._mapPokeList();

    if (this.filterValue) arrAux = this._filterByType(arrAux, this.filterValue);

    if (!value) {
      this.data = arrAux;
    } else {
      this.orderValue = value;
      this.data = this._orderDataByStats(arrAux, value);
    }
  }

  private _handleChangeFilter(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    let arrAux = this._mapPokeList();

    if (this.orderValue)
      arrAux = this._orderDataByStats(arrAux, this.orderValue);

    if (!value) {
      this.data = arrAux;
    } else {
      this.filterValue = value;
      this.data = this._filterByType(arrAux, value) || [];
    }
  }

  render() {
    return this.pokeList.length === 0
      ? html`<p>No hay pokemons para mostrar</p>`
      : html`
          <main>
            <div class="selects-wrapper">
              <div class="select-container">
                <label for="filter-select">Ordenar por característica:</label>
                <select
                  id="filter-select"
                  name="filter"
                  .value="${this.orderValue}"
                  @change="${this._handleChangeOrder}"
                >
                  <option value="">Seleccionar una característica</option>
                  ${this.ordersValue.map(
                    order =>
                      html`<option value="${order}">
                        ${PokeList.getStatsName(order)}
                      </option>`,
                  )}
                </select>
              </div>

              <div class="select-container">
                <label for="sort-select">Filtrar por tipo:</label>
                <select
                  id="sort-select"
                  name="sort"
                  .value="${this.filterValue}"
                  @change=${this._handleChangeFilter}
                >
                  <option value="">Selecciona un tipo</option>
                  ${this.filtersValue.map(
                    filter => html`
                      <option value="${filter}">
                        ${PokeList.getTypesName(filter)}
                      </option>
                    `,
                  )}
                </select>
              </div>
            </div>
            <ul>
              ${repeat(
                this.data,
                pokemon => pokemon.name,
                (item, _) => {
                  return html`
                    <poke-list-item .pokeItem=${item}></poke-list-item>
                  `;
                },
              )}
            </ul>
          </main>
        `;
  }
}
