import { useAppDispatch, useAppSelector } from '@renderer/store'
import {
  addModel as _addModel,
  removeModel as _removeModel,
  updateProvider as _updateProvider
} from '@renderer/store/llm'
import { Assistant, Model, Provider } from '@renderer/types'
import { useMemo } from 'react'

import { useDefaultModel } from './useAssistants'

export function useProvider(id: string) {
  const providers = useAppSelector((state) => state.llm.providers)
  const provider = useMemo(() => providers.find((p) => p.id === id) as Provider, [providers, id])
  const dispatch = useAppDispatch()

  return {
    provider,
    models: provider.models,
    addModel: (model: Model) => dispatch(_addModel({ providerId: id, model })),
    updateProvider: (provider: Provider) => dispatch(_updateProvider(provider)),
    removeModel: (model: Model) => dispatch(_removeModel({ providerId: id, model }))
  }
}

export function useProviders() {
  return useAppSelector((state) => state.llm.providers)
}

export function useProviderByAssistant(assistant: Assistant) {
  const { defaultModel } = useDefaultModel()
  const model = assistant.model || defaultModel
  const { provider } = useProvider(model.provider)

  return provider
}

export function useSystemProviders() {
  const providers = useAppSelector((state) => state.llm.providers)
  return useMemo(() => providers.filter((p) => p.isSystem), [providers])
}
