import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('pokemon-type')
export class PokemonTypes extends LitElement {
  @property({ type: String })
  id: string = '';

  @property({ type: String })
  literal: string = '';

  static styles = css`
    .pokemon-type {
      display: flex;
      gap: 10px;

      & .type {
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 0.8rem;
        font-weight: bold;
        color: white;
        text-transform: uppercase;

        &.normal {
          background-color: #a8a878;
        }

        &.fire {
          background-color: #f08030;
        }

        &.water {
          background-color: #6890f0;
        }

        &.electric {
          background-color: #f8d030;
        }

        &.grass {
          background-color: #78c850;
        }

        &.ice {
          background-color: #98d8d8;
        }

        &.fighting {
          background-color: #c03028;
        }

        &.poison {
          background-color: #a040a0;
        }

        &.ground {
          background-color: #e0c068;
        }

        &.flying {
          background-color: #a890f0;
        }

        &.psychic {
          background-color: #f85888;
        }

        &.bug {
          background-color: #a8b820;
        }

        &.rock {
          background-color: #b8a038;
        }

        &.ghost {
          background-color: #705898;
        }

        &.dragon {
          background-color: #7038f8;
        }

        &.dark {
          background-color: #705848;
        }

        &.steel {
          background-color: #b8b8d0;
        }

        &.fairy {
          background-color: #ee99ac;
        }
      }
    }
  `;

  render() {
    return html`
      <div class="pokemon-type">
        <span class="type ${this.id}">${this.literal}</span>
      </div>
    `;
  }
}
