import { useAgent } from '@renderer/hooks/useAgents'
import { useActiveTopic } from '@renderer/hooks/useTopic'
import { Agent } from '@renderer/types'
import { Flex } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'

import Conversations from './Conversations'
import InputChat from './InputChat'
import TopicList from './TopicList'

interface Props {
  agent: Agent
}

const Chat: FC<Props> = (props) => {
  const { agent } = useAgent(props.agent?.id)
  const { activeTopic, setActiveTopic } = useActiveTopic(agent)

  if (!agent) {
    return null
  }

  return (
    <Container id="chat">
      <Flex vertical flex={1} justify="space-between">
        <Conversations agent={agent} topic={activeTopic} />

        <InputChat agent={agent} setActiveTopic={setActiveTopic} />
      </Flex>

      <TopicList agent={agent} activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
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
