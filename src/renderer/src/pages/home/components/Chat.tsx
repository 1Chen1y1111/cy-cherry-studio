import { Agent } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import Conversations from './Conversations'
import InputChat from './InputChat'

interface Props {
  agent: Agent
}

const Chat: FC<Props> = ({ agent }) => {
  const [conversationId, setConversationId] = useState<string>(agent.conversations[0] || uuid())

  useEffect(() => {
    setConversationId(agent.conversations[0] || uuid())
  }, [agent])

  if (!agent) {
    return null
  }

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
  justify-content: space-between;
`

export default Chat
