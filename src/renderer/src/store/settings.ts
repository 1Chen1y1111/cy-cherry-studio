import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SendMessageShortcut = 'Enter' | 'Shift+Enter'

export interface SettingsState {
  showRightSidebar: boolean
  sendMessageShortcut: SendMessageShortcut
  language: string
}

const initialState: SettingsState = {
  showRightSidebar: false,
  sendMessageShortcut: 'Enter',
  language: navigator.language
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleRightSidebar: (state) => {
      state.showRightSidebar = !state.showRightSidebar
    },
    setSendMessageShortcut: (state, action: PayloadAction<SendMessageShortcut>) => {
      state.sendMessageShortcut = action.payload
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    }
  }
})

export const { toggleRightSidebar, setSendMessageShortcut, setLanguage } = settingsSlice.actions

export default settingsSlice.reducer
