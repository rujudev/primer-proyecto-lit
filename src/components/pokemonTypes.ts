import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { pokeItemContext } from '../context/pokeitem-context.js';
import { PokeItem } from '../services/pokemon.js';

import './pokemonType.js';

@customElement('pokemon-types')
export class PokemonTypes extends LitElement {
  @consume({ context: pokeItemContext })
  pokeItem: PokeItem | null = null;

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
        ${this.pokeItem?.types.map(
          ({ id, literal }) =>
            html`<pokemon-type id="${id}" literal="${literal}"></pokemon-type>`,
        )}
      </div>
    `;
  }
}
