import { Navbar, NavbarCenter, NavbarLeft, NavbarRight } from '@renderer/components/app/Navbar'
import useConversations from '@renderer/hooks/useConversations'
import { FC } from 'react'
import styled from 'styled-components'

import Chat from './components/Chat'
import Conversations from './components/Conversations'

const HomePage: FC = () => {
  const { conversations, activeConversation, setActiveConversation, addConversation } = useConversations()

  const onCreateConversation = () => {
    const _conversation = {
      id: Math.random().toString(),
      name: 'New Conversation',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      lastMessage: 'message',
      lastMessageAt: 'now'
    }
    addConversation(_conversation)
    setActiveConversation(_conversation)
  }

  return (
    <Container>
      <Navbar>
        <NavbarLeft style={{ justifyContent: 'flex-end' }}>
          <NewButton onClick={onCreateConversation}>
            <i className="iconfont icon-a-addchat"></i>
          </NewButton>
        </NavbarLeft>

        <NavbarCenter>Cy-Cherry AI</NavbarCenter>

        <NavbarRight />
      </Navbar>

      <ContentContainer>
        <Conversations
          conversations={conversations}
          activeConversation={activeConversation}
          onSelectConversation={setActiveConversation}
        />

        <Chat activeConversation={activeConversation} />

        <Settings />
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
  &:hover {
    background-color: var(--color-background-soft);
    cursor: pointer;
    color: var(--color-icon-white);
  }
`

const Settings = styled.div`
  display: flex;
  height: 100%;
  min-width: var(--settings-width);
`

export default HomePage
