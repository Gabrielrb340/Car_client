import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login-page';
import CriarContaPage from './pages/criar-conta/CriarConta-Page';
import MainPage from './pages/main/main-page';
import PerfilPage from './pages/perfil/perfil.page';
import { SnackbarProvider } from 'notistack';
import AcidentePage from './pages/acidente/acidente.page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
  <SnackbarProvider maxSnack={3}>

  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signin" element={<CriarContaPage />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/perfil" element={<PerfilPage />} />
    <Route path="/cadastroacidente" element={<AcidentePage />} />

  </Routes>
  </SnackbarProvider>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
