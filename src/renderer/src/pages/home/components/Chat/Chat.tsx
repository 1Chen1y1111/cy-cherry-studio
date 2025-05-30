import { useAssistant } from '@renderer/hooks/useAssistants'
import { useActiveTopic } from '@renderer/hooks/useTopic'
import { Assistant } from '@renderer/types'
import { Flex } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'

import Conversations from './Conversations'
import InputChat from './InputChat'
import TopicList from './TopicList'

interface Props {
  assistant: Assistant
}

const Chat: FC<Props> = (props) => {
  const { assistant } = useAssistant(props.assistant?.id)
  const { activeTopic, setActiveTopic } = useActiveTopic(assistant)

  if (!assistant) {
    return null
  }

  return (
    <Container id="chat">
      <Flex vertical flex={1} justify="space-between">
        <Conversations assistant={assistant} topic={activeTopic} />

        <InputChat assistant={assistant} setActiveTopic={setActiveTopic} />
      </Flex>

      <TopicList assistant={assistant} activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
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
