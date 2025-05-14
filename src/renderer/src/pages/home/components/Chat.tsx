import { Thread } from '@renderer/types'
import { FC } from 'react'
import styled from 'styled-components'

import InputBar from './InputChat'

interface Props {
  activeThread: Thread | null
}

const Chat: FC<Props> = ({ activeThread }) => {
  return (
    <Container>
      <Threads>{activeThread?.id}</Threads>
      <InputBar />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  border-right: 1px solid #ffffff20;
`

const Threads = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 15px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Chat
