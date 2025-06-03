import { useAppDispatch, useAppSelector } from '@renderer/store'
import {
  addModel as _addModel,
  removeModel as _removeModel,
  updateProvider as _updateProvider
} from '@renderer/store/llm'
import { Model, Provider } from '@renderer/types'

export function useProvider(id: string) {
  const provider = useAppSelector((state) => state.llm.providers.filter((p) => p.id === id) as Provider)
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

export function useDefaultProvider() {
  return useAppSelector((state) => state.llm.providers.find((p) => p.isDefault))
}

export function useSystemProviders() {
  return useAppSelector((state) => state.llm.providers.filter((p) => p.isSystem))
}
