import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  getPokemon,
  getPokemons,
  PokeItem,
  PokeListItem,
} from './services/pokemon.js';

import { provide } from '@lit/context';
import { pokeItemContext } from './context/context.js';
import './pokeList.js';

@customElement('fetching-data')
export class FetchingData extends LitElement {
  @state() pokeList: PokeListItem[] = [];
  @state() pokePromises: Array<Promise<PokeListItem>> = [];

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      height: 100%;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      padding: 20px;
    }

    poke-list {
      display: flex;
      justify-content: center;
      width: 100%;

      max-width: 1920px;
    }
  `;

  async _initList() {
    const results = await getPokemons();

    this.pokePromises = results.map(({ url }) => {
      const urlObject = new URL(url);
      const pathnameParts = urlObject.pathname.split('/');
      const pokeId = pathnameParts[pathnameParts.length - 2];

      return getPokemon(pokeId);
    });

    Promise.all(this.pokePromises).then(pokemons => {
      this.pokeList = pokemons;
    });
  }

  connectedCallback(): void {
    super.connectedCallback();

    this._initList();
  }

  render() {
    return this.pokeList.length === 0
      ? html`<p>Cargando pokemons...</p>`
      : html` <poke-list .pokeList=${this.pokeList}></poke-list> `;
  }
}
