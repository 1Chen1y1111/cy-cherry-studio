import { EVENT_NAMES, EventEmitter } from '@renderer/services/event'
import { Agent, Message } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { FC, useState } from 'react'
import styled from 'styled-components'

interface Props {
  agent: Agent
}

const InputBar: FC<Props> = ({ agent }) => {
  const [text, setText] = useState('')

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      const conversationId = agent.conversations[0] ? agent.conversations[0] : uuid()

      const message: Message = {
        id: uuid(),
        content: text,
        agentId: agent.id,
        conversationId,
        createdAt: 'now'
      }

      EventEmitter.emit(EVENT_NAMES.SEND_MESSAGE, message)

      setText('')
      e.preventDefault()
    }
  }

  return (
    <Textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type a message..."
      autoFocus
    />
  )
}

const Textarea = styled.textarea`
  padding: 15px;
  width: 100%;
  height: 120px;
  min-height: 120px;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  color: var(--color-text);
  background-color: transparent;
  border-top: 0.5px solid #ffffff20;
`

export default InputBar
