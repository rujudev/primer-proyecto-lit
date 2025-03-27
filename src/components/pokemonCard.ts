import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('pokemon-card')
export class PokemonCard extends LitElement {
  @property({ type: Boolean })
  modalCard: boolean = false;

  static styles = css`
    /* Tarjeta de Pokémon */
    .pokemon-card {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease;

      &::marker {
        content: none;
      }
    }

    .pokemon-card:not(.modal-card) {
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);

        cursor: pointer;
      }
    }
  `;

  render() {
    const classes = {
      'pokemon-card': true,
    };

    return html`
      <li class=${classMap(classes)}>
        <slot></slot>
      </li>
    `;
  }
}
