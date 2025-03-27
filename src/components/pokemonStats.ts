import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { pokeItemContext } from '../context/context.js';
import { PokeItem, Stats } from '../services/pokemon.js';

import './pokemonStat.js';

@customElement('pokemon-stats')
export class PokemonStats extends LitElement {
  // @consume({ context: pokeItemContext })
  // pokeItem: PokeItem | null = null;

  @property({ type: Array })
  stats: Stats[] = [];

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
        ${this.stats.map(
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
