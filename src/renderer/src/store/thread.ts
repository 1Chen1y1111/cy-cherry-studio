import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { Thread } from '@renderer/types'

interface ThreadState {
  threads: Thread[]
}

const initialState: ThreadState = {
  threads: []
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
    },
    updateThread: (state, action: PayloadAction<Thread>) => {
      state.threads = state.threads.map((c) => (c.id === action.payload.id ? action.payload : c))
    }
  }
})

export const { addThread, removeThread, updateThread } = threadSlice.actions

export default threadSlice.reducer
