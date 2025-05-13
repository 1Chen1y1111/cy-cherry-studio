import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'

import Sidebar from './components/app/Sidebar'
import Statusbar from './components/app/Statusbar'
import AppsPage from './pages/apps/AppsPage'
import HomePage from './pages/home/HomePage'

function App(): React.JSX.Element {
  return (
    <BrowserRouter>
      <MainContainer>
        <Sidebar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apps" element={<AppsPage />} />
        </Routes>

        <Statusbar />
      </MainContainer>
    </BrowserRouter>
  )
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export default App
