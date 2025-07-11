import { Navbar, NavbarLeft, NavbarRight } from '@renderer/components/app/Navbar'
import { useAssistants, useDefaultAssistant } from '@renderer/hooks/useAssistants'
import { useShowRightSidebar } from '@renderer/hooks/useStore'
import { uuid } from '@renderer/utils'
import { Tooltip } from 'antd'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import Assistants from './components/Assistants'
import Chat from './components/Chat'
import Navigation from './components/Navigation'

const HomePage: FC = () => {
  const { assistants, addAssistant } = useAssistants()
  const [activeAssistant, setActiveAssistant] = useState(assistants[0])
  const { showRightSidebar, setShowRightSidebar } = useShowRightSidebar()
  const { defaultAssistant } = useDefaultAssistant()
  const { t } = useTranslation()

  const onCreateAssistant = () => {
    const assistant = { ...defaultAssistant, id: uuid() }
    addAssistant(assistant)
    setActiveAssistant(assistant)
  }

  return (
    <Container>
      <Navbar>
        <NavbarLeft style={{ justifyContent: 'flex-end', borderRight: 'none' }}>
          <NewButton onClick={onCreateAssistant}>
            <i className="iconfont icon-a-addchat"></i>
          </NewButton>
        </NavbarLeft>
        <Navigation activeAssistant={activeAssistant} />
        <NavbarRight style={{ justifyContent: 'flex-end', padding: 5 }}>
          <Tooltip
            placement="left"
            title={showRightSidebar ? t('assistant.topics.hide_topics') : t('assistant.topics.show_topics')}
            arrow>
            <NewButton onClick={setShowRightSidebar}>
              <i className={`iconfont ${showRightSidebar ? 'icon-showsidebarhoriz' : 'icon-hidesidebarhoriz'}`} />
            </NewButton>
          </Tooltip>
        </NavbarRight>
      </Navbar>
      <ContentContainer>
        <Assistants
          activeAssistant={activeAssistant}
          setActiveAssistant={setActiveAssistant}
          onCreateAssistant={onCreateAssistant}
        />
        <Chat assistant={activeAssistant} />
      </ContentContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: calc(100vh - var(---navbar-height));
`

const NewButton = styled.div`
  -webkit-app-region: none;
  border-radius: 4px;
  width: 34px;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  color: var(--color-icon);
  .iconfont {
    font-size: 22px;
  }
  .icon-showsidebarhoriz,
  .icon-hidesidebarhoriz {
    font-size: 18px;
  }
  &:hover {
    background-color: var(--color-background-soft);
    cursor: pointer;
    color: var(--color-icon-white);
  }
`

export default HomePage
