import { SYSTEM_MODELS } from '@renderer/config/models'
import { createMigrate } from 'redux-persist'

import { RootState } from '.'

const migrate = createMigrate({
  // @ts-ignore store type is unknown
  '2': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'yi',
            name: 'Yi',
            apiKey: '',
            apiHost: 'https://api.lingyiwanwu.com',
            isSystem: true,
            models: SYSTEM_MODELS.yi.filter((m) => m.defaultEnabled)
          }
        ]
      }
    }
  },
  // @ts-ignore store type is unknown
  '3': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'zhipu',
            name: 'ZhiPu',
            apiKey: '',
            apiHost: 'https://open.bigmodel.cn/api/paas/v4/',
            isSystem: true,
            models: SYSTEM_MODELS.zhipu.filter((m) => m.defaultEnabled)
          }
        ]
      }
    }
  },
  // @ts-ignore store type is unknown
  '4': (state: RootState) => {
    return {
      ...state,
      llm: {
        ...state.llm,
        providers: [
          ...state.llm.providers,
          {
            id: 'ollama',
            name: 'Ollama',
            apiKey: '',
            apiHost: 'http://localhost:11434/v1/',
            isSystem: true,
            models: []
          }
        ]
      }
    }
  }
})

export default migrate
