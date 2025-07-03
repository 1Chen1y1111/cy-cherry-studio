import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SYSTEM_MODELS } from '@renderer/config/models'
import { Model, Provider } from '@renderer/types'
import { unionBy } from 'lodash'

export interface LlmState {
  defaultModel: Model
  providers: Provider[]
  topicNamingModel: Model
}

const initialState: LlmState = {
  defaultModel: SYSTEM_MODELS.openai[0],
  topicNamingModel: SYSTEM_MODELS.openai[0],
  providers: [
    {
      id: 'openai',
      name: 'OpenAI',
      apiKey: '',
      apiHost: 'https://api.openai.com',
      models: SYSTEM_MODELS.openai.filter((m) => m.enabled),
      isSystem: true,
      enabled: true
    },
    {
      id: 'silicon',
      name: 'Silicon',
      apiKey: '',
      apiHost: 'https://api.siliconflow.cn',
      models: SYSTEM_MODELS.silicon.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'deepseek',
      name: 'deepseek',
      apiKey: '',
      apiHost: 'https://api.deepseek.com',
      models: SYSTEM_MODELS.deepseek.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'yi',
      name: 'Yi',
      apiKey: '',
      apiHost: 'https://api.lingyiwanwu.com',
      models: SYSTEM_MODELS.yi.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'zhipu',
      name: 'ZhiPu',
      apiKey: '',
      apiHost: 'https://open.bigmodel.cn/api/paas/v4/',
      models: SYSTEM_MODELS.zhipu.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'moonshot',
      name: 'Moonshot AI',
      apiKey: '',
      apiHost: 'https://api.moonshot.cn',
      models: SYSTEM_MODELS.moonshot.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'baichuan',
      name: 'BAICHUAN AI',
      apiKey: '',
      apiHost: 'https://api.baichuan-ai.com',
      models: SYSTEM_MODELS.baichuan.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'dashscope',
      name: 'DashScope',
      apiKey: '',
      apiHost: 'https://dashscope.aliyuncs.com/compatible-mode/v1/',
      models: SYSTEM_MODELS.dashscope.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      apiKey: '',
      apiHost: 'https://api.anthropic.com/',
      models: SYSTEM_MODELS.anthropic.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'openrouter',
      name: 'OpenRouter',
      apiKey: '',
      apiHost: 'https://openrouter.ai/api/v1/',
      models: SYSTEM_MODELS.openrouter.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'groq',
      name: 'Groq',
      apiKey: '',
      apiHost: 'https://api.groq.com/openai',
      models: SYSTEM_MODELS.groq.filter((m) => m.enabled),
      isSystem: true,
      enabled: false
    },
    {
      id: 'ollama',
      name: 'Ollama',
      apiKey: '',
      apiHost: 'http://localhost:11434/v1/',
      models: [],
      isSystem: true,
      enabled: false
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
    updateProviders: (state, action: PayloadAction<Provider[]>) => {
      state.providers = action.payload
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
    },
    setDefaultModel: (state, action: PayloadAction<{ model: Model }>) => {
      state.defaultModel = action.payload.model
    },
    setTopicNamingModel: (state, action: PayloadAction<{ model: Model }>) => {
      state.topicNamingModel = action.payload.model
    }
  }
})

export const {
  addProvider,
  removeProvider,
  updateProvider,
  updateProviders,
  addModel,
  removeModel,
  setDefaultModel,
  setTopicNamingModel
} = settingsSlice.actions

export default settingsSlice.reducer
