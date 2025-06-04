import { Navbar, NavbarCenter } from '@renderer/components/app/Navbar'
import { FC } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import AboutSettings from './AboutSettings'
import AssistantSettings from './AssistantSettings'
import GeneralSettings from './GeneralSettings'
import ModelSettings from './ModelSettings'
import ProviderSettings from './ProviderSettings'

const SettingsPage: FC = () => {
  const { pathname } = useLocation()

  const isRoute = (path: string): string => (pathname === path ? 'active' : '')

  return (
    <Container>
      <Navbar>
        <NavbarCenter>Settings</NavbarCenter>
      </Navbar>
      <ContentContainer>
        <SettingMenus>
          <MenuItemLink to="/settings/general">
            <MenuItem className={isRoute('/settings/general')}>General</MenuItem>
          </MenuItemLink>
          <MenuItemLink to="/settings/provider">
            <MenuItem className={isRoute('/settings/provider')}>Model Provider</MenuItem>
          </MenuItemLink>
          <MenuItemLink to="/settings/model">
            <MenuItem className={isRoute('/settings/model')}>Model Settings</MenuItem>
          </MenuItemLink>
          <MenuItemLink to="/settings/assistant">
            <MenuItem className={isRoute('/settings/assistant')}>Default Assistant</MenuItem>
          </MenuItemLink>
          <MenuItemLink to="/settings/about">
            <MenuItem className={isRoute('/settings/about')}>About</MenuItem>
          </MenuItemLink>
        </SettingMenus>
        <SettingContent>
          <Routes>
            <Route path="general" element={<GeneralSettings />} />
            <Route path="provider" element={<ProviderSettings />} />
            <Route path="model" element={<ModelSettings />} />
            <Route path="assistant" element={<AssistantSettings />} />
            <Route path="about" element={<AboutSettings />} />
          </Routes>
        </SettingContent>
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`

const SettingMenus = styled.ul`
  display: flex;
  flex-direction: column;
  min-width: var(--assistants-width);
  border-right: 1px solid var(--color-border);
  padding: 10px;
`

const MenuItemLink = styled(Link)`
  text-decoration: none;
  color: var(--color-text-1);
  margin-bottom: 5px;
`

const MenuItem = styled.li`
  padding: 6px 10px;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #135200;
  }
  &.active {
    background: #135200;
    font-weight: bold;
  }
`

const SettingContent = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  border-right: 0.5px solid var(--color-border);
`

export default SettingsPage
