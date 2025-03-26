import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('pokemon-stat')
export class PokemonTypes extends LitElement {
  @property({ type: String })
  statId: String = '';

  @property({ type: String })
  literal: String = '';

  @property({ type: Number })
  baseStat: Number = 0;

  static styles = css`
    .stat {
      & .stat-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & .stat-name {
          font-weight: bold;
          font-size: 0.9rem;
        }

        & .stat-value {
          float: right;
          font-size: 0.9rem;
        }
      }

      & .stat-bar {
        height: 8px;
        background-color: #eee;
        border-radius: 4px;
        margin-top: 5px;
        overflow: hidden;

        & .stat-fill {
          height: 100%;
          border-radius: 4px;

          &.hp {
            background-color: var(--hp-color);
          }

          &.attack {
            background-color: var(--attack-color);
          }

          &.special-attack {
            background-color: var(--special-attack-color);
          }

          &.defense {
            background-color: var(--defense-color);
          }

          &.special-defense {
            background-color: var(--special-defense-color);
          }

          &.speed {
            background-color: var(--speed-color);
          }
        }
      }
    }
  `;

  render() {
    return html`
      <div class="stat">
        <div class="stat-info">
          <span class="stat-name">${this.literal}:</span>
          <span class="stat-value">${this.baseStat}</span>
        </div>
        <div class="stat-bar">
          <div
            class="stat-fill ${this.statId}"
            style="width: ${this.baseStat}%;"
          ></div>
        </div>
      </div>
    `;
  }
}
