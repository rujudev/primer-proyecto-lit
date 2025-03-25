import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('pokemon-image')
export class PokemonImage extends LitElement {
  render() {
    return html`
      <div class="pokemon-image">
        <slot></slot>
      </div>
    `;
  }
}
