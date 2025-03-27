import { provide } from '@lit/context';
import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Modal, modalContext } from '../context/context.js';

@customElement('pokemon-modal')
export class PokemonModal extends LitElement {
  @provide({ context: modalContext })
  @state()
  modalContext: Modal | null = null;

  private _handleCloseModal(e: Event) {
    // this.modalContext = {
    //   open: false,
    //   clickedPokeItem: null,
    // };
  }

  static styles = css`
    .modal {
      position: fixed;
      width: 100%;
      min-width: 100vw;

      height: 100%;
      min-height: 100vh;

      top: 0;

      &:not([hidden]) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgba(0, 0, 0, 0.5);

        & > button {
          all: unset;
          display: flex;
          position: absolute;
          top: 10px;
          right: 20px;

          &:hover {
            cursor: pointer;
          }

          & svg {
            width: 50px;
            height: 50px;

            stroke: white;
          }
        }
      }
    }
  `;

  protected updated(_changedProperties: PropertyValues): void {
    console.log('Contexto recibido', _changedProperties);
  }

  render() {
    // ?hidden="${!this.modalContext?.open}"
    return html` <div class="modal" @click="${this._handleCloseModal}">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
      <poke-list-item class="modal-open" .modalCard=${true}></poke-list-item>
    </div>`;
  }
}
