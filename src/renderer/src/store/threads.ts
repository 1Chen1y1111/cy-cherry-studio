import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Thread } from '@renderer/types'

interface ThreadState {
  threads: Thread[]
  activeThread: Thread | null
}

const initialState: ThreadState = {
  threads: [],
  activeThread: null
}

const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    addThread: (state, action: PayloadAction<Thread>) => {
      state.threads.push(action.payload)
    },
    removeThread: (state, action: PayloadAction<{ id: string }>) => {
      state.threads = state.threads.filter((c) => c.id !== action.payload.id)
      state.activeThread = state.threads[0]
    },
    updateThread: (state, action: PayloadAction<Thread>) => {
      state.threads = state.threads.map((c) => (c.id === action.payload.id ? action.payload : c))
    },
    setActiveThread: (state, action: PayloadAction<Thread>) => {
      state.activeThread = action.payload
    }
  }
})

export const { addThread, removeThread, updateThread, setActiveThread } = threadSlice.actions

export default threadSlice.reducer
