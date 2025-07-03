import i18n from '@renderer/i18n'
import store from '@renderer/store'
import { setGenerating } from '@renderer/store/runtime'
import { Assistant, Message, Provider, Topic } from '@renderer/types'
import { getErrorMessage, uuid } from '@renderer/utils'
import dayjs from 'dayjs'

import { getAssistantProvider, getDefaultModel, getProviderByModel, getTopNamingModel } from './assistant'
import { EVENT_NAMES, EventEmitter } from './event'
import ProviderSDK from './ProviderSDK'

interface FetchChatCompletionParams {
  messages: Message[]
  assistant: Assistant
  topic: Topic
  onResponse: (message: Message) => void
}

export async function fetchChatCompletion({ messages, assistant, topic, onResponse }: FetchChatCompletionParams) {
  window.keyv.set(EVENT_NAMES.CHAT_COMPLETION_PAUSED, false)

  const provider = getAssistantProvider(assistant)
  const defaultModel = getDefaultModel()
  const model = assistant.model || defaultModel
  const providerSdk = new ProviderSDK(provider)

  store.dispatch(setGenerating(true))

  const message: Message = {
    id: uuid(),
    role: 'assistant',
    content: '',
    assistantId: assistant.id,
    topicId: topic.id,
    modelId: model.id,
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    status: 'sending'
  }

  onResponse({ ...message })

  try {
    await providerSdk.completions(messages, assistant, ({ text, usage }) => {
      message.content = message.content + text || ''
      message.usage = usage
      onResponse({ ...message, status: 'pending' })
    })
  } catch (error: any) {
    message.content = `Error: ${error.message}`
  }

  // Update message status
  message.status = window.keyv.get(EVENT_NAMES.CHAT_COMPLETION_PAUSED) ? 'paused' : 'success'

  // Emit chat completion event
  EventEmitter.emit(EVENT_NAMES.AI_CHAT_COMPLETION, message)

  // Reset generating state
  store.dispatch(setGenerating(false))

  return message
}

interface FetchMessagesSummaryParams {
  messages: Message[]
  assistant: Assistant
}

export async function fetchMessagesSummary({ messages, assistant }: FetchMessagesSummaryParams) {
  const model = getTopNamingModel() || assistant.model || getDefaultModel()
  const provider = getProviderByModel(model)
  const providerSdk = new ProviderSDK(provider)
  return providerSdk.summaries(messages, assistant)
}

export async function checkApi(provider: Provider) {
  const model = provider.models[0]
  const key = 'api-check'
  const style = { marginTop: '3vh' }

  if (!provider.apiKey) {
    window.message.error({ content: i18n.t('message.error.enter.api.key'), key, style })
    return false
  }

  if (!provider.apiHost) {
    window.message.error({ content: i18n.t('message.error.enter.api.host'), key, style })
    return false
  }

  if (!model) {
    window.message.error({ content: i18n.t('message.error.enter.model'), key, style })
    return false
  }

  const providerSdk = new ProviderSDK(provider)

  const { valid, error } = await providerSdk.check()

  window.message[valid ? 'success' : 'error']({
    key: 'api-check',
    style: { marginTop: '3vh' },
    duration: valid ? 2 : 8,
    content: valid
      ? i18n.t('message.api.connection.success')
      : i18n.t('message.api.connection.failed') + ' ' + getErrorMessage(error)
  })

  return valid
}

export async function fetchModels(provider: Provider) {
  const providerSdk = new ProviderSDK(provider)

  try {
    return await providerSdk.models()
  } catch (error) {
    return []
  }
}
