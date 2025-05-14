import { Navbar, NavbarCenter, NavbarLeft, NavbarRight } from '@renderer/components/app/Navbar'
import useThreads from '@renderer/hooks/useThreads'
import { Thread } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { FC, useEffect } from 'react'
import styled from 'styled-components'

import Chat from './components/Chat'
import Threads from './components/Threads'

const HomePage: FC = () => {
  const { threads, activeThread, setActiveThread, addThread } = useThreads()

  useEffect(() => {
    !activeThread && setActiveThread(threads[0])
  }, [activeThread, threads, setActiveThread])

  const onCreateThread = () => {
    const _thread: Thread = {
      id: uuid(),
      name: 'New Thread',
      avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
      lastMessage: 'message',
      lastMessageAt: 'now',
      conversations: []
    }

    addThread(_thread)
    setActiveThread(_thread)
  }

  return (
    <Container>
      <Navbar>
        <NavbarLeft style={{ justifyContent: 'flex-end' }}>
          <NewButton onClick={onCreateThread}>
            <i className="iconfont icon-a-addchat"></i>
          </NewButton>
        </NavbarLeft>

        <NavbarCenter style={{ border: 'none' }}>{activeThread?.name}</NavbarCenter>

        <NavbarRight style={{ justifyContent: 'flex-end', padding: 5 }}>
          <NewButton>
            <i className="iconfont icon-showsidebarhoriz"></i>
          </NewButton>
        </NavbarRight>
      </Navbar>

      <ContentContainer>
        <Threads />

        <Chat />
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
