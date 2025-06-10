import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import AssistantSettingPopup from '@renderer/components/Popups/AssistantSettingPopup'
import { useAssistants } from '@renderer/hooks/useAssistants'
import { getDefaultTopic } from '@renderer/services/assistant'
import { Assistant } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { Dropdown, MenuProps } from 'antd'
import { last } from 'lodash'
import { FC, useRef } from 'react'
import styled from 'styled-components'

interface Props {
  activeAssistant: Assistant
  setActiveAssistant: (assistant: Assistant) => void
  onCreateAssistant: () => void
}

const Assistants: FC<Props> = ({ activeAssistant, setActiveAssistant, onCreateAssistant }) => {
  const { assistants, removeAssistant, updateAssistant, addAssistant } = useAssistants()
  const targetAssistant = useRef<Assistant | null>(null)

  const onDelete = (assistant: Assistant) => {
    removeAssistant(assistant.id)
    setTimeout(() => {
      const _assistant: Assistant | undefined = last(assistants.filter((a) => a.id !== assistant.id))
      _assistant ? setActiveAssistant(_assistant) : onCreateAssistant()
    }, 0)
  }

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit',
      icon: <EditOutlined />,
      async onClick() {
        if (targetAssistant.current) {
          const _assistant = await AssistantSettingPopup.show({ assistant: targetAssistant.current })
          updateAssistant(_assistant)
        }
      }
    },
    {
      label: 'Duplicate',
      key: 'duplicate',
      icon: <CopyOutlined />,
      async onClick() {
        const assistant: Assistant = { ...activeAssistant, id: uuid(), topics: [getDefaultTopic()] }
        addAssistant(assistant)
        setActiveAssistant(assistant)
      }
    },
    { type: 'divider' },
    {
      label: 'Delete',
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => {
        targetAssistant.current && onDelete(targetAssistant.current)
      }
    }
  ]

  return (
    <Container>
      {assistants.map((assistant) => (
        <Dropdown
          key={assistant.id}
          menu={{ items }}
          trigger={['contextMenu']}
          onOpenChange={() => (targetAssistant.current = assistant)}>
          <AssistantItem
            onClick={() => setActiveAssistant(assistant)}
            className={assistant.id === activeAssistant?.id ? 'active' : ''}>
            <AssistantName>{assistant.name}</AssistantName>
            <AssistantLastMessage>{assistant.description}</AssistantLastMessage>
          </AssistantItem>
        </Dropdown>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: var(--assistants-width);
  max-width: var(--assistants-width);
  border-right: 0.5px solid var(--color-border);
  height: calc(100vh - var(--navbar-height));
  overflow-y: auto;
`

const AssistantItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  position: relative;
  cursor: pointer;
  .anticon {
    display: none;
  }
  &:hover {
    background-color: var(--color-background-soft);
    .anticon {
      display: block;
      color: var(--color-text-1);
    }
  }
  &.active {
    background-color: var(--color-background-mute);
    cursor: pointer;
  }
`

const AssistantName = styled.div`
  font-size: 14px;
  color: var(--color-text-1);
  font-weight: bold;
`

const AssistantLastMessage = styled.div`
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

export default Assistants
