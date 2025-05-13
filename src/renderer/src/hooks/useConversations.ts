import { runAsyncFunction } from '@renderer/utils'
import localforage from 'localforage'
import { useEffect, useState } from 'react'

export type Conversation = {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageAt: string
}

type useConversationsReturn = {
  conversations: Conversation[]
  setConversations: (conversations: Conversation[]) => void
  activeConversation: Conversation | null
  setActiveConversation: (conversation: Conversation | null) => void
  addConversation: (conversation: Conversation) => void
  removeConversation: (id: string) => void
  updateConversation: (conversation: Conversation) => void
}

export default function useConversations(): useConversationsReturn {
  const conversationsKey = 'conversations'
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)

  // use localforage to initialize conversations
  useEffect(() => {
    runAsyncFunction(async () => {
      const conversations = await localforage.getItem<Conversation[]>(conversationsKey)
      conversations && setConversations(conversations)
    })
  }, [])

  // update localforage when conversations change
  useEffect(() => {
    localforage.setItem(conversationsKey, conversations)
  }, [conversations])

  const addConversation = (conversation: Conversation) => {
    setConversations([...conversations, conversation])
  }

  const removeConversation = (id: string) => {
    setConversations(conversations.filter((conversation) => conversation.id !== id))
  }

  const updateConversation = (conversation: Conversation) => {
    setConversations(conversations.map((c) => (c.id === conversation.id ? conversation : c)))
  }

  return {
    conversations,
    setConversations,
    activeConversation,
    setActiveConversation,
    addConversation,
    removeConversation,
    updateConversation
  }
}
