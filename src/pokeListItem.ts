import { localized } from '@lit/localize';
import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PokeItem } from './services/pokemon.js';

import { consume } from '@lit/context';
import './components/pokemonAbilitities.js';
import './components/pokemonCard.js';
import './components/pokemonImage.js';
import './components/pokemonInfo.js';
import './components/pokemonStats.js';
import './components/pokemonTypes.js';
import { Modal, modalContext } from './context/context.js';

@customElement('poke-list-item')
@localized()
export class PokeListItem extends LitElement {
  // @consume({ context: pokeItemContext })
  @property({ type: Object })
  public pokeItem: PokeItem | null | undefined = null;

  @consume({ context: modalContext })
  @state()
  private _modalContext?: Modal;

  protected updated(_changedProperties: PropertyValues): void {
    console.log('PokeListItem actualizado', _changedProperties);
  }
  static styles = css`
    :host(.modal-open) {
      width: 100%;
      max-width: 300px;
    }

    /* Información del Pokémon */
    .pokemon-name {
      font-size: 1.5rem;
      margin-bottom: 0;
      color: #333;
    }
  `;

  private _handleSelectPokeCard(clickedElement: PokeItem | null | undefined) {
    if (clickedElement) {
      this.dispatchEvent(
        new CustomEvent('selected-poke-item', {
          detail: clickedElement,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  render() {
    console.log(this._modalContext);
    return html`
      <pokemon-card @click="${() => this._handleSelectPokeCard(this.pokeItem)}">
        <pokemon-info>
          <h2 class="pokemon-name">${this.pokeItem?.name}</h2>
          <pokemon-image
            sprite="${this.pokeItem?.sprite || ''}"
            name="${this.pokeItem?.name || ''}"
          ></pokemon-image>

          <!-- Tipo de pokemon -->
          <pokemon-types .types="${this.pokeItem?.types || []}"></pokemon-types>

          <!-- Estadísticas -->
          <pokemon-stats .stats="${this.pokeItem?.stats || []}"></pokemon-stats>

          <!-- Habilidades -->
          <pokemon-abilities
            .abilities="${this.pokeItem?.abilities || []}"
          ></pokemon-abilities>
        </pokemon-info>
      </pokemon-card>
    `;
  }
}
