import { Refine } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar';

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
} from '@refinedev/mui';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Appbar from './components/appbar';
import { ColorModeContextProvider } from './contexts/color-mode';

import { PokemonList, PokemonShow } from './pages/pokemons';

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: 'auto' } }} />
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');
            `}
          </style>

          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider('https://pokeapi.co/api/v2')}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: 'pokemons',
                  list: '/pokemon',
                  show: '/pokemon/:name/',
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <>
                      <Appbar />
                      <Outlet />
                    </>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="pokemons" />}
                  />
                  <Route path="/pokemon">
                    <Route index element={<PokemonList />} />
                    <Route path="show/:name" element={<PokemonShow />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
