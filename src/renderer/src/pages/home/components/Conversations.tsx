import 'highlight.js/styles/github-dark.css'

import useAgents from '@renderer/hooks/useAgents'
import { EVENT_NAMES, EventEmitter } from '@renderer/services/event'
import { openaiProvider } from '@renderer/services/provider'
import { Agent, Conversation, Message } from '@renderer/types'
import { runAsyncFunction, uuid } from '@renderer/utils'
import localforage from 'localforage'
import { reverse } from 'lodash'
import { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import MessageItem from './Message'

interface Props {
  agent: Agent
  conversationId: string
}

const Conversations: FC<Props> = ({ agent, conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [lastMessage, setLastMessage] = useState<Message | null>(null)
  const { addConversation } = useAgents()

  const onSendMessage = useCallback(
    (message: Message) => {
      const _messages = [...messages, message]
      setMessages(_messages)

      addConversation(agent.id, conversationId)

      localforage.setItem<Conversation>(`conversation:${conversationId}`, {
        id: conversationId,
        messages: _messages
      })
    },
    [addConversation, agent.id, conversationId, messages]
  )

  const fetchChatCompletion = useCallback(
    async (message: Message) => {
      const stream = await openaiProvider.chat.completions.create({
        model: 'Qwen/Qwen2-7B-Instruct',
        messages: [{ role: 'user', content: message.content }],
        stream: true
      })

      const _message: Message = {
        id: uuid(),
        content: '',
        agentId: agent.id,
        conversationId,
        createdAt: 'now'
      }

      let content = ''

      for await (const chunk of stream) {
        content = content + (chunk.choices[0]?.delta.content || '')
        setLastMessage({ ..._message, content })
      }

      _message.content = content

      EventEmitter.emit(EVENT_NAMES.AI_CHAT_COMPLETION, _message)

      return _message
    },
    [agent.id, conversationId]
  )

  useEffect(() => {
    const unsubscribes = [
      EventEmitter.on(EVENT_NAMES.SEND_MESSAGE, async (message: Message) => {
        onSendMessage(message)
        fetchChatCompletion(message)
      }),

      EventEmitter.on(EVENT_NAMES.AI_CHAT_COMPLETION, async (message: Message) => {
        setLastMessage(null)
        onSendMessage(message)
      })
    ]
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe())
  }, [fetchChatCompletion, onSendMessage])

  useEffect(() => {
    runAsyncFunction(async () => {
      const conversation = await localforage.getItem<Conversation>(`conversation:${conversationId}`)
      conversation && setMessages(conversation.messages)
    })
  }, [conversationId])

  useEffect(() => {
    const unsubscribe = EventEmitter.on(EVENT_NAMES.SEND_MESSAGE, onSendMessage)
    return () => unsubscribe()
  }, [onSendMessage])

  return (
    <Container>
      {lastMessage && <MessageItem message={lastMessage} />}
      {reverse([...messages]).map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex-direction: column-reverse;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Conversations
