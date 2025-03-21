import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { setLocale } from './localization.js';
import { PokeItem } from './services/pokemon.js';

import './pokeListItem.js';

@customElement('poke-list')
export class PokeList extends LitElement {
  @property({ type: Array }) pokeList: PokeItem[] = [];

  static styles = css`
    main {
      flex-grow: 1;
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
  `;

  connectedCallback(): void {
    super.connectedCallback();

    setLocale('es');
  }

  render() {
    return this.pokeList.length === 0
      ? html`<p>No hay pokemons para mostrar</p>`
      : html`
          <ul>
            ${repeat(
              this.pokeList,
              pokemon => pokemon.name,
              (item, _) => {
                return html`
                  <poke-list-item .pokeItem=${item}></poke-list-item>
                `;
              },
            )}
          </ul>
        `;
  }
}
