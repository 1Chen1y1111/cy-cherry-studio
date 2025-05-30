import { Agent, Message, Topic } from '@renderer/types'
import { uuid } from '@renderer/utils'
import { ChatCompletionMessageParam, ChatCompletionSystemMessageParam } from 'openai/resources/chat'

import { EVENT_NAMES, EventEmitter } from './event'
import { openaiProvider } from './provider'

interface FetchChatCompletionParams {
  message: Message
  agent: Agent
  topic: Topic
  onResponse: (message: Message) => void
}

export async function fetchChatCompletion({ message, agent, topic, onResponse }: FetchChatCompletionParams) {
  const stream = await openaiProvider.chat.completions.create({
    model: 'Qwen/Qwen2-7B-Instruct',
    messages: [
      { role: 'system', content: agent.prompt },
      { role: 'user', content: message.content }
    ],
    stream: true
  })

  const _message: Message = {
    id: uuid(),
    role: 'agent',
    content: '',
    agentId: agent.id,
    topicId: topic.id,
    createdAt: 'now'
  }

  let content = ''

  for await (const chunk of stream) {
    content = content + (chunk.choices[0]?.delta?.content || '')
    onResponse({ ..._message, content })
  }

  _message.content = content

  EventEmitter.emit(EVENT_NAMES.AI_CHAT_COMPLETION, _message)

  return _message
}

interface FetchConversationSummaryParams {
  messages: Message[]
}

export async function fetchConversationSummary({ messages }: FetchConversationSummaryParams) {
  const userMessages: ChatCompletionMessageParam[] = messages.map((message) => ({
    role: 'user',
    content: message.content
  }))

  const systemMessage: ChatCompletionSystemMessageParam = {
    role: 'system',
    content:
      '你是一名擅长会话的助理，你需要将用户的会话总结为 10 个字以内的标题，回复内容不需要用引号引起来，不需要在结尾加上句号。'
  }

  const stream = await openaiProvider.chat.completions.create({
    model: 'Qwen/Qwen2-7B-Instruct',
    messages: [systemMessage, ...userMessages],
    stream: false
  })

  return stream.choices[0]?.message?.content
}
