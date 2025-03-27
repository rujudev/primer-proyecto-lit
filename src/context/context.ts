import { createContext, type Context } from '@lit/context';
import { PokeItem } from '../services/pokemon.js';

export type Modal = {
  open: boolean;
  clickedPokeItem: PokeItem | null;
};

export const pokeItemContext = createContext<PokeItem | null>('pokeItem');

export const modalContext = createContext<Modal | null>('modal');
