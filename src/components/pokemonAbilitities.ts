import { consume } from '@lit/context';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { pokeItemContext } from '../context/pokeitem-context.js';
import { PokeItem } from '../services/pokemon.js';

@customElement('pokemon-abilities')
export class PokemonAbilities extends LitElement {
  @consume({ context: pokeItemContext })
  pokeItem: PokeItem | null = null;

  static styles = css`
    .pokemon-abilities {
      & h3 {
        font-size: 24px;
        margin-bottom: 15px;
      }

      & ul {
        list-style: none;
        margin: 0;
        padding: 0;

        display: flex;
        flex-direction: column;
        gap: 1rem;

        & li {
          display: flex;
          align-items: center;
          gap: 1rem;

          & svg {
            width: 1rem;
            height: 1rem;
            fill: black;
          }

          & span {
            font-size: 18px;
          }
        }
      }
    }
  `;

  render() {
    return html`
      <div class="pokemon-abilities">
        <h3>Habilidades:</h3>
        <ul>
          ${this.pokeItem?.abilities.map(
            ({ literal }) => html`
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="icon icon-tabler icons-tabler-filled icon-tabler-point"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                  />
                </svg>
                <span>${literal}</span>
              </li>
            `,
          )}
        </ul>
      </div>
    `;
  }
}
