import { Navbar, NavbarCenter, NavbarLeft, NavbarRight } from '@renderer/components/app/Navbar'
import useAgents from '@renderer/hooks/useAgents'
import { useShowRightSidebar } from '@renderer/hooks/useStore'
import { getDefaultAgent } from '@renderer/services/agent'
import { uuid } from '@renderer/utils'
import { Tooltip } from 'antd'
import { FC, useState } from 'react'
import styled from 'styled-components'

import Agents from './components/Agents'
import Chat from './components/Chat/Chat'

const HomePage: FC = () => {
  const { agents, addAgent } = useAgents()
  const [activeAgent, setActiveAgent] = useState(agents[0])
  const { showRightSidebar, setShowRightSidebar } = useShowRightSidebar()

  const onCreateAgent = () => {
    const _agent = getDefaultAgent()
    _agent.id = uuid()

    addAgent(_agent)
    setActiveAgent(_agent)
  }

  return (
    <Container>
      <Navbar>
        <NavbarLeft style={{ justifyContent: 'flex-end', borderRight: 'none' }}>
          <NewButton onClick={onCreateAgent}>
            <i className="iconfont icon-a-addchat"></i>
          </NewButton>
        </NavbarLeft>

        <NavbarCenter style={{ border: 'none' }}>{activeAgent?.name}</NavbarCenter>

        <NavbarRight style={{ justifyContent: 'flex-end', padding: 5 }}>
          <Tooltip placement="left" title={showRightSidebar ? 'Hide Topic' : 'Show Topics'} arrow>
            <NewButton onClick={setShowRightSidebar}>
              <i className={`iconfont ${showRightSidebar ? 'icon-showsidebarhoriz' : 'icon-hidesidebarhoriz'}`} />
            </NewButton>
          </Tooltip>
        </NavbarRight>
      </Navbar>

      <ContentContainer>
        <Agents activeAgent={activeAgent} onActive={setActiveAgent} />

        <Chat agent={activeAgent} />
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
  height: 100%;
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
