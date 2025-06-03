import 'highlight.js/styles/github-dark.css'

import { DEFAULT_TOPIC_NAME } from '@renderer/config/constant'
import { useAssistant } from '@renderer/hooks/useAssistants'
import { useProviderByAssistant } from '@renderer/hooks/useProvider'
import { fetchChatCompletion, fetchConversationSummary } from '@renderer/services/api'
import { EVENT_NAMES, EventEmitter } from '@renderer/services/event'
import LocalStorage from '@renderer/services/storage'
import { Assistant, Message, Topic } from '@renderer/types'
import { runAsyncFunction } from '@renderer/utils'
import hljs from 'highlight.js'
import localforage from 'localforage'
import { reverse } from 'lodash'
import { FC, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import MessageItem from './Message'

interface Props {
  assistant: Assistant
  topic: Topic
}

const Conversations: FC<Props> = ({ assistant, topic }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [lastMessage, setLastMessage] = useState<Message | null>(null)
  const { updateTopic } = useAssistant(assistant.id)
  const provider = useProviderByAssistant(assistant)

  const onSendMessage = useCallback(
    (message: Message) => {
      const _messages = [...messages, message]
      setMessages(_messages)

      localforage.setItem<Topic>(`topic:${topic.id}`, {
        ...topic,
        messages: _messages
      })
    },
    [messages, topic]
  )

  const autoRenameTopic = useCallback(async () => {
    if (topic.name === DEFAULT_TOPIC_NAME && messages.length >= 2) {
      const summaryText = await fetchConversationSummary({ messages, assistant })
      summaryText && updateTopic({ ...topic, name: summaryText })
    }
  }, [messages, topic, assistant, updateTopic])

  useEffect(() => {
    const unsubscribes = [
      EventEmitter.on(EVENT_NAMES.SEND_MESSAGE, async (message: Message) => {
        onSendMessage(message)
        fetchChatCompletion({ assistant, message, topic, onResponse: setLastMessage })
      }),

      EventEmitter.on(EVENT_NAMES.AI_CHAT_COMPLETION, async (message: Message) => {
        setLastMessage(null)
        onSendMessage(message)
        setTimeout(() => {
          EventEmitter.emit(EVENT_NAMES.AI_AUTO_RENAME)
        }, 100)
      }),

      EventEmitter.on(EVENT_NAMES.AI_AUTO_RENAME, autoRenameTopic),

      EventEmitter.on(EVENT_NAMES.CLEAR_CONVERSATION, () => {
        setMessages([])
        updateTopic({ ...topic, messages: [] })
        LocalStorage.clearTopicMessages(topic.id)
      })
    ]

    return () => unsubscribes.forEach((unsubscribe) => unsubscribe())
  }, [assistant, provider, autoRenameTopic, onSendMessage, topic, updateTopic])

  useEffect(() => {
    runAsyncFunction(async () => {
      const messages = await LocalStorage.getTopicMessages(topic?.id)
      setMessages(messages || [])
    })
  }, [topic?.id])

  useEffect(() => hljs.highlightAll())

  return (
    <Container id="topics">
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
  max-height: calc(100vh - var(--input-bar-height) - var(--navbar-height));
  &::-webkit-scrollbar {
    display: none;
  }
`

export default Conversations
