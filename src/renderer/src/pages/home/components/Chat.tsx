import { useAssistant } from '@renderer/hooks/useAssistants'
import { useActiveTopic } from '@renderer/hooks/useTopic'
import { Assistant } from '@renderer/types'
import { Flex } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'

import InputChat from './InputChat'
import Messages from './Messages'
import Topics from './Topics'

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
        <Messages assistant={assistant} topic={activeTopic} />

        <InputChat assistant={assistant} setActiveTopic={setActiveTopic} />
      </Flex>

      <Topics assistant={assistant} activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1;
  justify-content: space-between;
`

export default Chat
