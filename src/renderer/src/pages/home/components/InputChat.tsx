import { Message, Thread } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { FC, useState } from 'react'
import styled from 'styled-components'

interface Props {
  activeThread: Thread
  onSendMessage: (message: Message) => void
}

const InputBar: FC<Props> = ({ activeThread, onSendMessage }) => {
  const [text, setText] = useState('')

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      const conversationId = activeThread.conversations[0] ? activeThread.conversations[0] : uuid()

      const message: Message = {
        id: uuid(),
        content: text,
        threadId: activeThread.id,
        conversationId,
        createdAt: 'noe'
      }

      onSendMessage(message)
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
  height: 100px;
  border: none;
  outline: none;
  resize: none;
  font-size: 14px;
  color: var(--color-text);
  background-color: transparent;
  border-top: 1px solid #ffffff20;
`

export default InputBar
