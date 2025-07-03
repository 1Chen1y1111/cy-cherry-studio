import { Model } from '@renderer/types'
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

/**
 * 重新排序拖拽项目的工具函数
 * @param list 要重新排序的数组
 * @param startIndex 拖拽项目的起始索引
 * @param endIndex 拖拽项目的目标索引
 * @param len 要移动的项目数量，默认为1
 * @returns 重新排序后的新数组
 */
export const droppableReorder = <T>(list: T[], startIndex: number, endIndex: number, len = 1): T[] => {
  const result = Array.from(list)
  const removed = result.splice(startIndex, len)
  result.splice(endIndex, 0, ...removed)
  return result
}

/**
 * 获取字符串的第一个字符
 * @param str 输入字符串，可选参数
 * @returns 返回字符串的第一个字符，如果字符串为空或未定义则返回空字符串
 */
export const firstLetter = (str?: string) => {
  return str ? str[0] : ''
}

/**
 * 判断模型是否是免费模型
 * @param model 模型
 * @returns 是否是免费模型
 */
export function isFreeModel(model: Model) {
  return (model.id + model.name).toLocaleLowerCase().includes('free')
}

/**
 * @returns 是否是生产环境
 */
export async function isProduction() {
  const { isPackaged } = await window.api.getAppInfo()

  return isPackaged
}

/**
 * @returns 是否是开发环境
 */
export async function isDev() {
  const isProd = await isProduction()
  return !isProd
}

export function getErrorMessage(error: any) {
  if (!error) {
    return ''
  }

  if (typeof error === 'string') {
    return error
  }

  if (error?.error) {
    return getErrorMessage(error.error)
  }

  if (error?.message) {
    return error.message
  }

  return ''
}

export function removeQuotes(str) {
  return str.replace(/['"]+/g, '')
}
