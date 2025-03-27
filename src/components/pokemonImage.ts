import { consume } from '@lit/context';
import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { pokeItemContext } from '../context/context.js';
import { PokeItem } from '../services/pokemon.js';

@customElement('pokemon-image')
export class PokemonImage extends LitElement {
  // @consume({ context: pokeItemContext })
  // @state()
  // pokeItem: PokeItem | null = null;

  @property({ type: String })
  sprite: string = '';

  @property({ type: String })
  name: string = '';

  static styles = css`
    .pokemon-image {
      padding: 20px;
      text-align: center;

      & img {
        width: 120px;
        height: 120px;
        object-fit: contain;
      }
    }
  `;

  render() {
    return html`
      <div class="pokemon-image">
        <img src=${this.sprite} alt=${this.name} />
      </div>
    `;
  }
}
