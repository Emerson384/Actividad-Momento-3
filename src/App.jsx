import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FavoritosProvider } from './context/FavoritosProvider';
import { AuthProvider } from './context/AuthProvider';
import Layout from './components/Layout';
import RutaProtegida from './components/RutaProtegida';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Soluciones from './pages/Soluciones';
import Favoritos from './pages/Favoritos';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FavoritosProvider>
          <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route element={<RutaProtegida />}>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="soluciones" element={<Soluciones />} />
                <Route path="favoritos" element={<Favoritos />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </FavoritosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;