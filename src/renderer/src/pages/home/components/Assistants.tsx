import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd'
import AssistantSettingPopup from '@renderer/components/Popups/AssistantSettingPopup'
import { useAssistants } from '@renderer/hooks/useAssistants'
import { getDefaultTopic } from '@renderer/services/assistant'
import { Assistant } from '@renderer/types'
import { droppableReorder, uuid } from '@renderer/utils'
import { Dropdown, MenuProps } from 'antd'
import { last } from 'lodash'
import { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface Props {
  activeAssistant: Assistant
  setActiveAssistant: (assistant: Assistant) => void
  onCreateAssistant: () => void
}

const Assistants: FC<Props> = ({ activeAssistant, setActiveAssistant, onCreateAssistant }) => {
  const { assistants, removeAssistant, updateAssistant, addAssistant, updateAssistants } = useAssistants()
  const targetAssistant = useRef<Assistant | null>(null)
  const { t } = useTranslation()

  const onDelete = (assistant: Assistant) => {
    removeAssistant(assistant.id)
    setTimeout(() => {
      const _assistant: Assistant | undefined = last(assistants.filter((a) => a.id !== assistant.id))
      _assistant ? setActiveAssistant(_assistant) : onCreateAssistant()
    }, 0)
  }

  const items: MenuProps['items'] = [
    {
      label: t('common.edit'),
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
      label: t('common.duplicate'),
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
      label: t('common.delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => {
        targetAssistant.current && onDelete(targetAssistant.current)
      }
    }
  ]

  const onDragEnd = (result: DropResult) => {
    if (result.destination) {
      const sourceIndex = result.source.index
      const destIndex = result.destination.index
      updateAssistants(droppableReorder(assistants, sourceIndex, destIndex))
    }
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {assistants.map((assistant, index) => (
                <Draggable key={`draggable_${assistant.id}_${index}`} draggableId={assistant.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Dropdown
                        key={assistant.id}
                        menu={{ items }}
                        trigger={['contextMenu']}
                        onOpenChange={() => (targetAssistant.current = assistant)}>
                        <AssistantItem
                          onClick={() => setActiveAssistant(assistant)}
                          className={assistant.id === activeAssistant?.id ? 'active' : ''}>
                          <AssistantName>{assistant.name}</AssistantName>
                        </AssistantItem>
                      </Dropdown>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
  padding: 10px;
  overflow-y: auto;
`

const AssistantItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 10px;
  position: relative;
  border-radius: 5px;
  margin-bottom: 5px;
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

export default Assistants
