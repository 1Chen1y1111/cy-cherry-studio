import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SYSTEM_MODELS } from '@renderer/config/models'
import { Model, Provider } from '@renderer/types'
import { unionBy } from 'lodash'

export interface LlmState {
  defaultModel: Model
  providers: Provider[]
}

const initialState: LlmState = {
  defaultModel: SYSTEM_MODELS.openai[0],
  providers: [
    {
      id: 'openai',
      name: 'OpenAI',
      apiKey: '',
      apiHost: 'https://api.openai.com',
      isSystem: true,
      models: SYSTEM_MODELS.openai.filter((m) => m.defaultEnabled)
    },
    {
      id: 'silicon',
      name: 'Silicon',
      apiKey: '',
      apiHost: 'https://api.siliconflow.cn',
      isSystem: true,
      models: SYSTEM_MODELS.silicon.filter((m) => m.defaultEnabled)
    },
    {
      id: 'deepseek',
      name: 'deepseek',
      apiKey: '',
      apiHost: 'https://api.deepseek.com',
      isSystem: true,
      models: SYSTEM_MODELS.deepseek.filter((m) => m.defaultEnabled)
    },
    {
      id: 'groq',
      name: 'Groq',
      apiKey: '',
      apiHost: 'https://api.groq.com/openai',
      isSystem: true,
      models: SYSTEM_MODELS.groq.filter((m) => m.defaultEnabled)
    }
  ]
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addProvider: (state, action: PayloadAction<Provider>) => {
      state.providers.push(action.payload)
    },
    removeProvider: (state, action: PayloadAction<Provider>) => {
      state.providers = state.providers.filter((p) => p.id !== action.payload.id && !p.isSystem)
    },
    updateProvider: (state, action: PayloadAction<Provider>) => {
      state.providers = state.providers.map((p) => (p.id === action.payload.id ? { ...p, ...action.payload } : p))
    },
    addModel: (state, action: PayloadAction<{ providerId: string; model: Model }>) => {
      state.providers = state.providers.map((p) => {
        return p.id === action.payload.providerId
          ? {
              ...p,
              models: unionBy(p.models.concat(action.payload.model), 'id')
            }
          : p
      })
    },
    removeModel: (state, action: PayloadAction<{ providerId: string; model: Model }>) => {
      state.providers = state.providers.map((p) => {
        return p.id === action.payload.providerId
          ? {
              ...p,
              models: p.models.filter((m) => m.id !== action.payload.model.id)
            }
          : p
      })
    }
  }
})

export const { addProvider, removeProvider, updateProvider, addModel, removeModel } = settingsSlice.actions

export default settingsSlice.reducer
