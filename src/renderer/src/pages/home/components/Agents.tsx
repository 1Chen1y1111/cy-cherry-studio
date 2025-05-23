import { EllipsisOutlined } from '@ant-design/icons'
import useAgents from '@renderer/hooks/useAgents'
import { Agent } from '@renderer/types'
import { Dropdown, MenuProps } from 'antd'
import { FC, useRef } from 'react'
import styled from 'styled-components'

interface Props {
  activeAgent: Agent
  onActive: (agent: Agent) => void
  onRemove: (agent: Agent) => void
}

const Agents: FC<Props> = ({ activeAgent, onActive, onRemove }) => {
  const { agents, removeAgent } = useAgents()
  const targetAgent = useRef<Agent | null>(null)

  const onDelete = (agent: Agent) => {
    removeAgent(agent.id)
    onRemove(agent)
  }

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit'
    },
    {
      label: 'Favorite',
      key: 'favorite'
    },
    {
      label: 'Delete',
      key: 'delete',
      onClick: () => targetAgent.current && onDelete(activeAgent)
    }
  ]

  return (
    <Container>
      {agents.map((agent) => {
        return (
          <AgentItem
            key={agent.id}
            className={agent.id === activeAgent?.id ? 'active' : ''}
            onClick={() => onActive(agent)}>
            <Dropdown menu={{ items }}>
              <EllipsisOutlined
                style={{ position: 'absolute', right: 12, top: 12 }}
                onClick={(e) => {
                  e.stopPropagation()
                  targetAgent.current = agent
                }}
              />
            </Dropdown>
            <AgentName>{agent.name}</AgentName>
            <AgentLastMessage>{agent.lastMessage}</AgentLastMessage>
            <AgentTime>{agent.lastMessageAt}</AgentTime>
          </AgentItem>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: var(--conversations-width);
  max-width: var(--conversations-width);
  border-right: 0.5px solid #ffffff20;
  height: calc(100vh - var(--navbar-height));
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const AgentItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  cursor: pointer;
  .anticon {
    display: none;
  }
  &:hover {
    background-color: var(--color-background-soft);
    .anticon {
      display: block;
    }
  }
  &.active {
    background-color: var(--color-background-mute);
    cursor: pointer;
  }
`

const AgentTime = styled.div`
  font-size: 12px;
  color: var(--color-text-2);
`

const AgentName = styled.div`
  font-size: 14px;
  color: var(--color-text-1);
  font-weight: bold;
`

const AgentLastMessage = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: var(--color-text-2);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  height: 20px;
`

export default Agents
