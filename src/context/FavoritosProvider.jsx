import { useState } from 'react';
import { FavoritosContext } from './FavoritosContext';

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (item) => {
    setFavoritos((actuales) =>
      actuales.some((favorito) => favorito.id === item.id)
        ? actuales.filter((favorito) => favorito.id !== item.id)
        : [...actuales, item],
    );
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}
