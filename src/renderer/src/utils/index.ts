import imageCompression from 'browser-image-compression'
import { v4 as uuidv4 } from 'uuid'

/**
 * 运行异步函数
 * @param fn 异步函数
 */
export const runAsyncFunction = async (fn: () => void) => {
  await fn()
}

/**
 * 延迟执行
 * @param seconds 延迟时间（秒）
 * @returns Promise<boolean>
 */
export const delay = (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
}

/**
 * 判断字符串是否是 json 字符串
 * @param str 字符串
 */
export function isJSON(str: any): boolean {
  if (typeof str !== 'string') {
    return false
  }

  try {
    return typeof JSON.parse(str) === 'object'
  } catch (e) {
    return false
  }
}

/**
 * Waiting fn return true
 **/
export const waitAsyncFunction = (fn: () => Promise<any>, interval = 200, stopTimeout = 60000) => {
  let timeout = false
  const timer = setTimeout(() => (timeout = true), stopTimeout)

  return (async function check(): Promise<any> {
    if (await fn()) {
      clearTimeout(timer)
      return Promise.resolve()
    } else if (!timeout) {
      return delay(interval / 1000).then(check)
    } else {
      return Promise.resolve()
    }
  })()
}

/**
 * 生成 uuid
 * @returns uuid
 */
export const uuid = (): string => uuidv4()

/**
 * 将文件转换为 Base64 格式
 * @param file 要转换的文件对象
 * @returns Promise<string | ArrayBuffer | null> 返回 Base64 字符串或 null
 */
export const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = () => reject
    reader.readAsDataURL(file)
  })
}

export const compressImage = async (file: File) => {
  return await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 300,
    useWebWorker: false
  })
}

/**
 * 根据 ID 生成默认的分组名称
 * @param id 模型或提供商的 ID
 * @returns 格式化的分组名称（大写）
 * 'gpt-3.5-turbo-16k-0613' to 'GPT-3.5-Turbo'
 * 'qwen2:1.5b' to 'QWEN2'
 */
export const getDefaultGroupName = (id: string) => {
  if (id.includes(':')) {
    return id.split(':')[0].toUpperCase()
  }

  if (id.includes('-')) {
    const parts = id.split('-')
    return parts[0].toUpperCase() + '-' + parts[1].toUpperCase()
  }

  return id.toUpperCase()
}

export const droppableReorder = <T>(list: T[], startIndex: number, endIndex: number, len = 1): T[] => {
  const result = Array.from(list)
  const removed = result.splice(startIndex, len)
  result.splice(endIndex, 0, ...removed)
  return result
}
