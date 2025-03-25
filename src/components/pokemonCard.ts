import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('pokemon-card')
export class PokemonCard extends LitElement {
  render() {
    return html`
      <li class="pokemon-card">
        <slot></slot>
      </li>
    `;
  }
}
