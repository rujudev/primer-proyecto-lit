import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { pokeItemContext } from '../context/pokeitem-context.js';
import { PokeItem } from '../services/pokemon.js';

import './pokemonStat.js';

@customElement('pokemon-stats')
export class PokemonStats extends LitElement {
  @consume({ context: pokeItemContext })
  pokeItem: PokeItem | null = null;

  static styles = css`
    .pokemon-stats {
      margin-bottom: 15px;

      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `;

  render() {
    return html`
      <div class="pokemon-stats">
        ${this.pokeItem?.stats.map(
          ({ id, literal, baseStat }) => html`
            <pokemon-stat
              statId="${id}"
              baseStat="${baseStat}"
              literal="${literal}"
            ></pokemon-stat>
          `,
        )}
      </div>
    `;
  }
}
