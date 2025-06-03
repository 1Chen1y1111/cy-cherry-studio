import { ClearOutlined, MoreOutlined } from '@ant-design/icons'
import { useAssistant } from '@renderer/hooks/useAssistants'
import { useShowRightSidebar } from '@renderer/hooks/useStore'
import { EVENT_NAMES, EventEmitter } from '@renderer/services/event'
import { Assistant, Message, Topic } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { Button, Popconfirm, Tooltip } from 'antd'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
  assistant: Assistant
  setActiveTopic: (topic: Topic) => void
}

const InputChat: FC<Props> = ({ assistant, setActiveTopic }) => {
  const [text, setText] = useState('')
  const { setShowRightSidebar } = useShowRightSidebar()
  const { addTopic } = useAssistant(assistant.id)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      const topicId = assistant.topics[0] ? assistant.topics[0].id : uuid()

      const message: Message = {
        id: uuid(),
        role: 'user',
        content: text,
        assistantId: assistant.id,
        topicId,
        createdAt: 'now'
      }

      EventEmitter.emit(EVENT_NAMES.SEND_MESSAGE, message)

      setText('')
      e.preventDefault()
    }
  }

  const addNewTopic = useCallback(() => {
    const topic: Topic = {
      id: uuid(),
      name: 'Default Topic',
      messages: []
    }

    addTopic(topic)
    setActiveTopic(topic)
  }, [addTopic, setActiveTopic])

  const clearTopic = () => {
    EventEmitter.emit(EVENT_NAMES.CLEAR_CONVERSATION)
  }

  // Command or Ctrl + N create new topic
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        addNewTopic()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [addNewTopic])

  useEffect(() => {
    inputRef.current?.focus()
  }, [assistant])

  return (
    <Container>
      <Toolbar>
        <ToolbarMenu>
          <Tooltip placement="top" title=" New Chat " arrow>
            <ToolbarButton onClick={addNewTopic}>
              <i className="iconfont icon-a-new-chat" />
            </ToolbarButton>
          </Tooltip>
          <Tooltip placement="top" title=" Topics " arrow>
            <ToolbarButton onClick={setShowRightSidebar}>
              <i className="iconfont icon-textedit_text_topic" />
            </ToolbarButton>
          </Tooltip>
          <Tooltip placement="top" title=" Clear " arrow>
            <Popconfirm
              icon={false}
              title="Clear all messages?"
              description="Are you sure to clear all messages?"
              placement="top"
              onConfirm={clearTopic}
              okText="Clear"
              cancelText="Cancel">
              <ToolbarButton type="text">
                <ClearOutlined />
              </ToolbarButton>
            </Popconfirm>
          </Tooltip>
        </ToolbarMenu>
        <ToolbarMenu>
          <Tooltip placement="top" title=" Settings " arrow>
            <ToolbarButton style={{ marginRight: 0 }}>
              <MoreOutlined />
            </ToolbarButton>
          </Tooltip>
        </ToolbarMenu>
      </Toolbar>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        autoFocus
        contextMenu="true"
        ref={inputRef}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: var(--input-bar-height);
  border-top: 0.5px solid var(--color-border);
  padding: 5px 15px;
`

const Textarea = styled.textarea`
  display: flex;
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  font-size: 13px;
  line-height: 18px;
  color: var(--color-text);
  background-color: transparent;
`

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 -5px;
  margin-bottom: 5px;
`

const ToolbarMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ToolbarButton = styled(Button)`
  width: 32px;
  height: 32px;
  font-size: 18px;
  border-radius: 50%;
  transition: all 0.3s ease;
  margin-right: 6px;
  color: var(--color-icon);
  &.anticon {
    transition: all 0.3s ease;
    color: var(--color-icon);
  }
  &:hover {
    background-color: var(--color-background-soft);
    .anticon {
      color: white;
    }
  }
`

export default InputChat
