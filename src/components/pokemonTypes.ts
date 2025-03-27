import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { pokeItemContext } from '../context/context.js';
import { PokeItem, Types } from '../services/pokemon.js';

import './pokemonType.js';

@customElement('pokemon-types')
export class PokemonTypes extends LitElement {
  // @consume({ context: pokeItemContext })
  // pokeItem: PokeItem | null = null;

  @property({ type: Array })
  types: Types[] = [];

  static styles = css`
    .pokemon-types {
      display: flex;
      justify-content: space-between;
      height: fit-content;
    }
  `;

  render() {
    return html`
      <div class="pokemon-types">
        ${this.types.map(
          ({ id, literal }) =>
            html`<pokemon-type id="${id}" literal="${literal}"></pokemon-type>`,
        )}
      </div>
    `;
  }
}
