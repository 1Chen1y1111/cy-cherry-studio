import { Navbar, NavbarCenter, NavbarLeft, NavbarRight } from '@renderer/components/app/Navbar'
import useAgents from '@renderer/hooks/useAgents'
import { Agent } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { FC, useEffect } from 'react'
import styled from 'styled-components'

import Threads from './components/Agents'
import Chat from './components/Chat'

const HomePage: FC = () => {
  const { agent, agents, setAgent, addAgent } = useAgents()

  useEffect(() => {
    !agent && agents[0] && setAgent(agents[0])
  }, [agent, agents, setAgent])

  const onCreateThread = () => {
    const _agent: Agent = {
      id: uuid(),
      name: 'New Thread',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      lastMessage: 'message',
      lastMessageAt: 'now',
      conversations: []
    }

    addAgent(_agent)
    setAgent(_agent)
  }

  return (
    <Container>
      <Navbar>
        <NavbarLeft style={{ justifyContent: 'flex-end' }}>
          <NewButton onClick={onCreateThread}>
            <i className="iconfont icon-a-addchat"></i>
          </NewButton>
        </NavbarLeft>

        <NavbarCenter style={{ border: 'none' }}>{agent?.name}</NavbarCenter>

        <NavbarRight style={{ justifyContent: 'flex-end', padding: 5 }}>
          <NewButton>
            <i className="iconfont icon-showsidebarhoriz"></i>
          </NewButton>
        </NavbarRight>
      </Navbar>

      <ContentContainer>
        <Threads />

        {agent && <Chat agent={agent} />}
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
