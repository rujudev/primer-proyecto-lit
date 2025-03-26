import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('pokemon-card')
export class PokemonCard extends LitElement {
  static styles = css`
    /* Tarjeta de Pokémon */
    .pokemon-card {
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .pokemon-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  `;

  render() {
    return html`
      <li class="pokemon-card">
        <slot></slot>
      </li>
    `;
  }
}
