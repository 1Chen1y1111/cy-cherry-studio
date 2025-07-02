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

export function getProviderByModel(model?: Model) {
  const providers = store.getState().llm.providers
  const providerId = model ? model.provider : getDefaultProvider()
  return providers.find((p) => p.id === providerId) as Provider
}

export function getTopNamingModel() {
  return store.getState().llm.topicNamingModel
}

export function getAssistantProvider(assistant: Assistant) {
  const providers = store.getState().llm.providers
  const provider = providers.find((p) => p.id === assistant.id)
  return provider || getDefaultProvider()
}

export function getProviderByModelId(modelId?: string) {
  const providers = store.getState().llm.providers
  const _modelId = modelId || getDefaultModel().id
  return providers.find((p) => p.models.find((m) => m.id === _modelId)) as Provider
}
