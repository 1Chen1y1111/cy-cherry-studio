import '@fontsource/inter'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Sidebar from './components/app/Sidebar'
import Statusbar from './components/app/Statusbar'
import AppsPage from './pages/apps/AppsPage'
import HomePage from './pages/home/HomePage'
import SettingsPage from './pages/settings/SettingsPage'

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <Sidebar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
      </Routes>

      <Statusbar />
    </BrowserRouter>
  )
}

export default App
