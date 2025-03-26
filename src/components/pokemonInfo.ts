import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { pokeItemContext } from '../context/pokeitem-context.js';
import { PokeItem } from '../services/pokemon.js';

@customElement('pokemon-info')
export class PokemonImage extends LitElement {
  @consume({ context: pokeItemContext })
  pokeItem: PokeItem | null = null;

  static styles = css`
    .pokemon-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      padding: 20px;
    }
  `;

  render() {
    return html`
      <div class="pokemon-info">
        <slot></slot>
      </div>
    `;
  }
}
