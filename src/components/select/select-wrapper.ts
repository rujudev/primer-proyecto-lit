import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import './select.js';

@customElement('select-wrapper')
export class SelectWrapper extends LitElement {
  @property({ type: Function })
  onHandleChangeOrder: Function = (e: Event) => null;

  @property({ type: Function })
  onHandleChangeFilter: Function = (e: Event) => null;

  @property({ type: String })
  filterValue: string = '';

  @property({ type: String })
  orderValue: string = '';

  private static ordersValue: string[] = [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
  ];

  private static filtersValue: string[] = [
    'bug',
    'fire',
    'flying',
    'grass',
    'normal',
    'poison',
    'water',
  ];

  static styles = css`
    .selects-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      width: 100%;

      .custom-select {
        width: 100%;
      }
    }
  `;

  render() {
    return html`
      <div class="selects-wrapper">
        <custom-select
          id="order-select"
          selectName="order"
          value="${this.orderValue}"
          .options="${SelectWrapper.ordersValue}"
          label="Ordenar por característica:"
          defaultOption="Seleccionar una característica"
          .onChange="${(e: Event) => this.onHandleChangeOrder(e)}"
        ></custom-select>
        <custom-select
          id="sort-select"
          selectName="sort"
          value="${this.filterValue}"
          .options="${SelectWrapper.filtersValue}"
          label="Filtrar por tipo:"
          defaultOption="Selecciona un tipo"
          .onChange="${(e: Event) => this.onHandleChangeFilter(e)}"
        ></custom-select>
      </div>
    `;
  }
}
/*
<div class="select-container">
          <label for="filter-select">Ordenar por característica:</label>
          <select
            id="filter-select"
            name="filter"
            .value="${this.orderValue}"
            @change="${this._handleChangeOrder}"
          >
            <option value="">Seleccionar una característica</option>
            ${PokeList.ordersValue.map(
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
            ${PokeList.filtersValue.map(
              filter => html`
                <option value="${filter}">
                  ${PokeList.getTypesName(filter)}
                </option>
              `,
            )}
          </select>
        </div>*/
