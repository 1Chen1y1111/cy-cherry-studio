import { Conversation } from '@renderer/hooks/useConversations'
import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  activeThread: Conversation | null
}

const Chat: FC<Props> = ({ activeThread }) => {
  return <Container>{activeThread?.id}</Container>
}

const Container = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  border-right: 1px solid #ffffff20;
`

export default Chat
