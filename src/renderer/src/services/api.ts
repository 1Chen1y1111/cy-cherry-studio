import { Assistant, Message, Provider, Topic } from '@renderer/types'
import { uuid } from '@renderer/utils'
import dayjs from 'dayjs'
import { takeRight } from 'lodash'
import OpenAI from 'openai'
import { ChatCompletionMessageParam, ChatCompletionSystemMessageParam } from 'openai/resources/chat'

import { getAssistantProvider, getDefaultModel, getProviderByModel, getTopNamingModel } from './assistant'
import { EVENT_NAMES, EventEmitter } from './event'

interface FetchChatCompletionParams {
  messages: Message[]
  assistant: Assistant
  topic: Topic
  onResponse: (message: Message) => void
}

const getOpenAiProvider = (provider: Provider) => {
  const host = provider.apiHost
  return new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: provider.apiKey,
    baseURL: host.endsWith('/') ? host : `${provider.apiHost}/v1/`
  })
}

export async function fetchChatCompletion({ messages, assistant, topic, onResponse }: FetchChatCompletionParams) {
  const provider = getAssistantProvider(assistant)
  const openaiProvider = getOpenAiProvider(provider)
  const defaultModel = getDefaultModel()
  const model = assistant.model || defaultModel

  const _message: Message = {
    id: uuid(),
    role: 'assistant',
    content: '',
    assistantId: assistant.id,
    topicId: topic.id,
    modelId: model.id,
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status: 'sending'
  }

  onResponse({ ..._message })

  const systemMessage = assistant.prompt ? { role: 'system', content: assistant.prompt } : undefined

  const userMessages = takeRight(messages, 5).map((message) => ({
    role: message.role,
    content: message.content
  }))

  const _messages = [systemMessage, ...userMessages].filter(Boolean) as ChatCompletionMessageParam[]

  try {
    const stream = await openaiProvider.chat.completions.create({
      model: model.id,
      messages: _messages,
      stream: true
    })

    let content = ''
    let usage: OpenAI.Completions.CompletionUsage | undefined = undefined

    for await (const chunk of stream) {
      content = content + (chunk.choices[0]?.delta?.content || '')
      chunk.usage && (usage = chunk.usage)
      onResponse({ ..._message, content, status: 'pending' })
    }

    _message.content = content
    _message.usage = usage
  } catch (error: any) {
    _message.content = `Error: ${error.message}`
  }

  _message.status = 'success'

  EventEmitter.emit(EVENT_NAMES.AI_CHAT_COMPLETION, _message)

  return _message
}

interface FetchMessagesSummaryParams {
  messages: Message[]
  assistant: Assistant
}

export async function fetchMessagesSummary({ messages, assistant }: FetchMessagesSummaryParams) {
  const model = getTopNamingModel() || assistant.model || getDefaultModel()
  const provider = getProviderByModel(model)
  const openaiProvider = getOpenAiProvider(provider)

  const userMessages: ChatCompletionMessageParam[] = takeRight(messages, 5).map((message) => ({
    role: 'user',
    content: message.content
  }))

  const systemMessage: ChatCompletionSystemMessageParam = {
    role: 'system',
    content:
      '你是一名擅长会话的助理，你需要将用户的会话总结为 10 个字以内的标题，回复内容不需要用引号引起来，不需要在结尾加上句号。'
  }

  const stream = await openaiProvider.chat.completions.create({
    model: model.id,
    messages: [systemMessage, ...userMessages],
    stream: false
  })

  return stream.choices[0]?.message?.content
}

export async function checkApi(provider: Provider) {
  const openaiProvider = getOpenAiProvider(provider)
  const model = provider.models[0]
  const key = 'api-check'
  const style = { marginTop: '3vh' }

  if (!provider.apiKey) {
    window.message.error({ content: 'Please enter your API key first', key, style })
    return false
  }

  if (!provider.apiHost) {
    window.message.error({ content: 'Please enter your API host first', key, style })
    return false
  }

  if (!model) {
    window.message.error({ content: 'Please select a model first', key, style })
    return false
  }

  let valid = false
  let errorMessage = ''

  try {
    const response = await openaiProvider.chat.completions.create({
      model: model.id,
      messages: [{ role: 'user', content: 'hello' }],
      stream: false
    })

    valid = Boolean(response?.choices[0].message)
  } catch (error) {
    errorMessage = (error as Error).message
    valid = false
  }

  window.message[valid ? 'success' : 'error']({
    key: 'api-check',
    style: { marginTop: '3vh' },
    duration: valid ? 2 : 8,
    content: valid ? 'API connection successful' : 'API connection failed ' + errorMessage
  })

  return valid
}

export async function fetchModels(provider: Provider) {
  try {
    const openaiProvider = getOpenAiProvider(provider)
    const response = await openaiProvider.models.list()
    return response.data
  } catch (error) {
    return []
  }
}
