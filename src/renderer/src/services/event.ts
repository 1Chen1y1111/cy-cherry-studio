import Emittery from 'emittery'

export const EventEmitter = new Emittery()

export const EVENT_NAMES = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  AI_CHAT_COMPLETION: 'AI_CHAT_COMPLETION',
  AI_AUTO_RENAME: 'AI_AUTO_RENAME',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  ADD_ASSISTANT: 'ADD_ASSISTANT',
  EDIT_MESSAGE: 'EDIT_MESSAGE'
}
