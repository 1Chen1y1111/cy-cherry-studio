import { Thread } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { FC, useState } from 'react'
import styled from 'styled-components'

import Conversations from './Conversations'
import InputChat from './InputChat'

interface Props {
  thread: Thread
}

const Chat: FC<Props> = ({ thread }) => {
  const [conversationId] = useState<string>(thread.conversations[0] || uuid())

  return (
    <Container>
      <Conversations thread={thread} conversationId={conversationId} />

      <InputChat thread={thread} />
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

export default Chat
