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
