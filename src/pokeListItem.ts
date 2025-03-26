import { provide } from '@lit/context';
import { localized, msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { pokeItemContext } from './context/pokeitem-context.js';
import { PokeItem } from './services/pokemon.js';

import './components/pokemonAbilitities.js';
import './components/pokemonCard.js';
import './components/pokemonImage.js';
import './components/pokemonInfo.js';
import './components/pokemonStats.js';
import './components/pokemonTypes.js';

@customElement('poke-list-item')
@localized()
export class PokeListItem extends LitElement {
  @provide({ context: pokeItemContext })
  @property({ type: Object })
  pokeItem: PokeItem | null = null;

  static styles = css`
    /* Información del Pokémon */

    .pokemon-name {
      font-size: 1.5rem;
      margin-bottom: 0;
      color: #333;
    }
  `;

  render() {
    return html`
      <pokemon-card>
        <pokemon-info>
          <h2 class="pokemon-name">${this.pokeItem?.name}</h2>
          <pokemon-image></pokemon-image>
          <!-- Tipo de pokemon -->
          <pokemon-types></pokemon-types>
          <!-- Estadísticas -->
          <pokemon-stats></pokemon-stats>
          <!-- Habilidades -->
          <pokemon-abilities></pokemon-abilities>
        </pokemon-info>
      </pokemon-card>
    `;
  }
}
