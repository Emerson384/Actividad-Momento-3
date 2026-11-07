import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritosProvider } from './context/FavoritosProvider';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Soluciones from './pages/Soluciones';
import Favoritos from './pages/Favoritos';

function App() {
  return (
    <FavoritosProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="soluciones" element={<Soluciones />} />
            <Route path="favoritos" element={<Favoritos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritosProvider>
  );
}

export default App;