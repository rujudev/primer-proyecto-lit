import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { pokeItemContext } from '../context/pokeitem-context.js';
import { PokeItem } from '../services/pokemon.js';

@customElement('pokemon-image')
export class PokemonImage extends LitElement {
  @consume({ context: pokeItemContext })
  @state()
  pokeItem: PokeItem | null = null;

  static styles = css`
    /* Imagen del Pokémon */
    .pokemon-image {
      background-color: #f0f0f0;
      padding: 20px;
      text-align: center;

      & img {
        width: 120px;
        height: 120px;
        object-fit: contain;
      }
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();

    debugger;
    console.log(this.pokeItem);
  }

  render() {
    return html`
      <div class="pokemon-image">
        <img
          src=${this.pokeItem?.sprite || ''}
          alt=${this.pokeItem?.name || ''}
        />
      </div>
    `;
  }
}
