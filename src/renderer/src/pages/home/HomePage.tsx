import { Navbar, NavbarCenter, NavbarLeft, NavbarRight } from '@renderer/components/app/Navbar'
import useAgents from '@renderer/hooks/useAgents'
import { Agent } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { last } from 'lodash'
import { FC, useState } from 'react'
import styled from 'styled-components'

import Agents from './components/Agents'
import Chat from './components/Chat'

const HomePage: FC = () => {
  const { agents, addAgent } = useAgents()
  const [activeAgent, setActiveAgent] = useState(agents[0])

  const onCreateConversation = () => {
    const _agent: Agent = {
      id: uuid(),
      name: 'New Thread',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      lastMessage: 'message',
      lastMessageAt: 'now',
      conversations: []
    }

    addAgent(_agent)
    setActiveAgent(_agent)
  }

  const onRemoveAgent = (agent: Agent) => {
    const _agent = last(agents.filter((a) => a.id !== agent.id))
    _agent && setActiveAgent(_agent)
  }

  return (
    <Container>
      <Navbar>
        <NavbarLeft style={{ justifyContent: 'flex-end', borderRight: 'none' }}>
          <NewButton onClick={onCreateConversation}>
            <i className="iconfont icon-a-addchat"></i>
          </NewButton>
        </NavbarLeft>

        <NavbarCenter style={{ border: 'none' }}>{activeAgent?.name}</NavbarCenter>

        <NavbarRight style={{ justifyContent: 'flex-end', padding: 5 }}>
          <NewButton>
            <i className="iconfont icon-showsidebarhoriz"></i>
          </NewButton>
        </NavbarRight>
      </Navbar>

      <ContentContainer>
        <Agents activeAgent={activeAgent} onActive={setActiveAgent} onRemove={onRemoveAgent} />
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
  .icon-showsidebarhoriz {
    font-size: 18px;
  }
  &:hover {
    background-color: var(--color-background-soft);
    cursor: pointer;
    color: var(--color-icon-white);
  }
`

export default HomePage
