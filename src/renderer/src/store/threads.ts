import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { getDefaultThread } from '@renderer/services/thread'
import { Thread } from '@renderer/types'

interface ThreadState {
  threads: Thread[]
}

const initialState: ThreadState = {
  threads: [getDefaultThread()]
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
    },
    addConversationToThread: (state, action: PayloadAction<{ threadId: string; conversationId: string }>) => {
      state.threads = state.threads.map((c) => {
        return c.id === action.payload.threadId
          ? { ...c, conversations: [...c.conversations, action.payload.conversationId] }
          : c
      })
    },
    removeConversationFromThread: (state, action: PayloadAction<{ threadId: string; conversationId: string }>) => {
      state.threads = state.threads.map((c) => {
        return c.id === action.payload.threadId
          ? { ...c, conversations: c.conversations.filter((id) => id !== action.payload.conversationId) }
          : c
      })
    }
  }
})

export const { addThread, removeThread, updateThread, addConversationToThread, removeConversationFromThread } =
  threadSlice.actions

export default threadSlice.reducer
