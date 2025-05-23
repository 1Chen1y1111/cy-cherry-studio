import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { getDefaultAgent } from '@renderer/services/agent'
import { Agent } from '@renderer/types'

interface AgentState {
  agents: Agent[]
}

const initialState: AgentState = {
  agents: [getDefaultAgent()]
}

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    addAgent: (state, action: PayloadAction<Agent>) => {
      state.agents.push(action.payload)
    },
    removeAgent: (state, action: PayloadAction<{ id: string }>) => {
      state.agents = state.agents.filter((agent) => agent.id !== action.payload.id)
    },
    updateAgent: (state, action: PayloadAction<Agent>) => {
      state.agents = state.agents.map((agent) => (agent.id === action.payload.id ? action.payload : agent))
    },
    addConversationToAgent: (state, action: PayloadAction<{ agentId: string; conversationId: string }>) => {
      state.agents = state.agents.map((agent) => {
        return agent.id === action.payload.agentId
          ? {
              ...agent,
              conversations: [...new Set([...agent.conversations, action.payload.conversationId])]
            }
          : agent
      })
    },
    removeConversationFromAgent: (state, action: PayloadAction<{ agentId: string; conversationId: string }>) => {
      state.agents = state.agents.map((agent) => {
        return agent.id === action.payload.agentId
          ? {
              ...agent,
              conversations: agent.conversations.filter((id) => id !== action.payload.conversationId)
            }
          : agent
      })
    }
  }
})

export const { addAgent, removeAgent, updateAgent, addConversationToAgent, removeConversationFromAgent } =
  agentSlice.actions

export default agentSlice.reducer
