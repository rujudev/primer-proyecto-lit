import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-select')
export class PokemonTypes extends LitElement {
  @property({ type: String })
  selectId: string = '';

  @property({ type: String })
  selectName: string = '';

  @property({ type: String })
  label: string = '';

  @property({ type: String })
  value: string = '';

  @property({ type: Array })
  options: string[] = [];

  @property({ type: String })
  defaultOption: string = '';

  @property({ type: Function })
  onChange: Function = (e: Event) => null;

  static styles = css`
    .select-container {
      display: flex;
      flex-direction: column;

      width: 100%;
      margin-bottom: 20px;

      & label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
      }

      & select {
        width: 100%;
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: white;
        font-size: 16px;
        color: #333;
        appearance: none;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
        background-repeat: no-repeat;
        background-position: right 10px center;
        background-size: 12px;

        &:hover {
          border-color: #999;
        }

        &:focus {
          border-color: #4a90e2;
          box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
          outline: none;
        }
      }
    }
  `;

  render() {
    return html`
      <div class="select-container">
        <label for="${this.selectId}">${this.label}</label>
        <select
          id="${this.selectId}"
          name="${this.selectName}"
          value="${this.value}"
          @change="${(e: Event) => this.onChange(e)}"
        >
          <option value="">${this.defaultOption}</option>
          ${this.options.map(
            option => html`<option value="${option}">${msg(option)}</option>`,
          )}
        </select>
      </div>
    `;
  }
}
