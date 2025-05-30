import { Topic } from '@renderer/types'
import localforage from 'localforage'

export async function getTopicMessage(id: string) {
  const topic = await localforage.getItem<Topic>(`topic:${id}`)

  return topic ? topic.messages : []
}
