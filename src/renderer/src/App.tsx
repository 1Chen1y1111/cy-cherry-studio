import '@fontsource/inter'

import store, { persistor } from '@renderer/store'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import Sidebar from './components/app/Sidebar'
import TopViewContainer from './components/TopView'
import { AntdThemeConfig } from './config/antd'
import AppsPage from './pages/apps/AppsPage'
import HomePage from './pages/home/HomePage'
import SettingsPage from './pages/settings/SettingsPage'

function App(): React.JSX.Element {
  return (
    <ConfigProvider theme={AntdThemeConfig}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TopViewContainer>
            <BrowserRouter>
              <Sidebar />

              <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="/apps" element={<AppsPage />} />
                <Route path="/settings/*" element={<SettingsPage />} />
              </Routes>
            </BrowserRouter>
          </TopViewContainer>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  )
}

export default App
