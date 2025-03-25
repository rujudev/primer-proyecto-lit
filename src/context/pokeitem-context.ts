import { createContext, type Context } from '@lit/context';
import { PokeItem } from '../services/pokemon.js';

export const pokeItemContext = createContext<PokeItem | null>('pokeItem');
