import store from '@renderer/store'
import { Assistant, Model, Provider, Topic } from '@renderer/types'
import { uuid } from '@renderer/utils'

export function getDefaultTopic(): Topic {
  return {
    id: uuid(),
    name: 'Default Topic',
    messages: []
  }
}

export function getDefaultAssistant(): Assistant {
  return {
    id: 'default',
    name: 'Default Assistant',
    description: "Hello, I'm Default Assistant.",
    prompt: '',
    topics: [getDefaultTopic()]
  }
}

export function getDefaultModel() {
  return store.getState().llm.defaultModel
}

export function getDefaultProvider() {
  return getProviderByModel(getDefaultModel())
}

export function getProviderByModel(model: Model) {
  const providers = store.getState().llm.providers
  return providers.find((p) => p.id === model.provider) as Provider
}

export function getAssistantProvider(assistant: Assistant) {
  const providers = store.getState().llm.providers
  const provider = providers.find((p) => p.id === assistant.id)
  return provider || getDefaultProvider()
}
