import { createContext, useContext } from 'react';

export const FavoritosContext = createContext(null);

export function useFavoritos() {
  const context = useContext(FavoritosContext);

  if (!context) {
    throw new Error('useFavoritos debe utilizarse dentro de FavoritosProvider.');
  }

  return context;
}