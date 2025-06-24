import Logo from '@renderer/assets/images/logo.png'
import useAvatar from '@renderer/hooks/useAvatar'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Sidebar: FC = () => {
  const { pathname } = useLocation()
  const { avatar } = useAvatar()

  const isRoute = (path: string): string => (pathname === path ? 'active' : '')

  return (
    <Container>
      <StyledLink to="/">
        <AvatarImg src={avatar || Logo} draggable={false} />
      </StyledLink>

      <MainMenus>
        <Menus>
          <StyledLink to="/">
            <Icon className={isRoute('/')}>
              <i className="iconfont icon-chat"></i>
            </Icon>
          </StyledLink>

          <StyledLink to="/apps">
            <Icon className={isRoute('/apps')}>
              <i className="iconfont icon-appstore"></i>
            </Icon>
          </StyledLink>
        </Menus>
      </MainMenus>

      <Menus>
        <StyledLink to="/settings/provider">
          <Icon className={pathname.startsWith('/settings') ? 'active' : ''}>
            <i className="iconfont icon-setting"></i>
          </Icon>
        </StyledLink>
      </Menus>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  min-width: var(--sidebar-width);
  min-height: 100%;
  background: #1f1f1f;
  padding-top: 40px;
  padding-bottom: 10px;
  -webkit-app-region: drag !important;
  border-right: 0.5px solid var(--color-border);
  margin-top: var(--navbar-height);
  padding-bottom: calc(var(--navbar-height) + 6px);
`

const AvatarImg = styled.img`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  background-color: var(--color-background-soft);
  margin: 5px 0;
`
const MainMenus = styled.div`
  display: flex;
  flex: 1;
`

const Menus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Icon = styled.div`
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-bottom: 5px;
  transition: background-color 0.2s ease;
  -webkit-app-region: none;
  .iconfont {
    color: var(--color-icon);
    font-size: 20px;
    transition: color 0.2s ease;
    text-decoration: none;
  }
  &:hover {
    background-color: #ffffff20;
    cursor: pointer;
    .iconfont {
      color: var(--color-icon-white);
    }
  }
  &.active {
    background-color: #ffffff30;
    .iconfont {
      color: var(--color-icon-white);
    }
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-app-region: none;
  &* {
    user-select: none;
  }
`

export default Sidebar
