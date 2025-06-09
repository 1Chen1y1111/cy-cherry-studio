import { Topic } from '@renderer/types'
import { convertToBase64 } from '@renderer/utils'
import localforage from 'localforage'

const IMAGE_PREFIX = 'image://'

export default class LocalStorage {
  static async getTopic(id: string) {
    return localforage.getItem<Topic>(`topic:${id}`)
  }

  static async getTopicMessages(id: string) {
    const topic = await localforage.getItem<Topic>(`topic:${id}`)
    return topic ? topic.messages : []
  }

  static async removeTopic(id: string) {
    localforage.removeItem(`topic:${id}`)
  }

  static async clearTopicMessages(id: string) {
    const topic = await this.getTopic(id)

    if (topic) {
      topic.messages = []
      await localforage.setItem(`topic:${id}`, topic)
    }
  }

  static async storeImage(name: string, file: File) {
    try {
      const base64Image = await convertToBase64(file)
      if (typeof base64Image === 'string') {
        await localforage.setItem(IMAGE_PREFIX + name, base64Image)
      }
    } catch (error) {
      console.error('Error storing the image', error)
    }
  }

  static async getImage(name: string) {
    return localforage.getItem<string>(IMAGE_PREFIX + name)
  }

  static async removeImage(name: string) {
    return localforage.removeItem(IMAGE_PREFIX + name)
  }
}
