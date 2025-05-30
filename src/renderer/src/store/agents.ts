import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { getDefaultAgent } from '@renderer/services/agent'
import LocalStorage from '@renderer/services/storage'
import { getDefaultTopic } from '@renderer/services/topic'
import { Agent, Topic } from '@renderer/types'
import { uniqBy } from 'lodash'

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
    addTopic: (state, action: PayloadAction<{ agentId: string; topic: Topic }>) => {
      state.agents = state.agents.map((agent) => {
        return agent.id === action.payload.agentId
          ? {
              ...agent,
              topics: uniqBy([action.payload.topic, ...agent.topics], 'id')
            }
          : agent
      })
    },
    removeTopic: (state, action: PayloadAction<{ agentId: string; topic: Topic }>) => {
      state.agents = state.agents.map((agent) => {
        return agent.id === action.payload.agentId
          ? {
              ...agent,
              topics: agent.topics.filter(({ id }) => id !== action.payload.topic.id)
            }
          : agent
      })
    },
    updateTopic: (state, action: PayloadAction<{ agentId: string; topic: Topic }>) => {
      state.agents = state.agents.map((agent) => {
        return agent.id === action.payload.agentId
          ? {
              ...agent,
              topics: agent.topics.map((topic) => (topic.id === action.payload.topic.id ? action.payload.topic : topic))
            }
          : agent
      })
    },
    removeAllTopics: (state, action: PayloadAction<{ agentId: string }>) => {
      state.agents = state.agents.map((agent) => {
        if (agent.id === action.payload.agentId) {
          agent.topics.forEach((topic) => LocalStorage.removeTopic(topic.id))
          return {
            ...agent,
            topics: [getDefaultTopic()]
          }
        }

        return agent
      })
    }
  }
})

export const { addAgent, removeAgent, updateAgent, addTopic, removeTopic, updateTopic, removeAllTopics } =
  agentSlice.actions

export default agentSlice.reducer
