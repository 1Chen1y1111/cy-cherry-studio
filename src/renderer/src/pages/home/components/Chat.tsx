import { Agent } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { FC, useState } from 'react'
import styled from 'styled-components'

import Conversations from './Conversations'
import InputChat from './InputChat'

interface Props {
  agent: Agent
}

const Chat: FC<Props> = ({ agent }) => {
  const [conversationId] = useState<string>(agent.conversations[0] || uuid())

  return (
    <Container>
      <Conversations agent={agent} conversationId={conversationId} />

      <InputChat agent={agent} />
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
