import { CopyOutlined, DeleteOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons'
import Logo from '@renderer/assets/images/logo.png'
import useAvatar from '@renderer/hooks/useAvatar'
import { EVENT_NAMES, EventEmitter } from '@renderer/services/event'
import { getModelLogo } from '@renderer/services/provider'
import { Message } from '@renderer/types'
import { Avatar, Tooltip } from 'antd'
import { FC } from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'

import CodeBlock from './CodeBlock'

interface Props {
  message: Message
  showMenu?: boolean
  onDeleteMessage?: (message: Message) => void
}

const MessageItem: FC<Props> = ({ message, showMenu, onDeleteMessage }) => {
  const { avatar } = useAvatar()

  const onCopy = () => {
    navigator.clipboard.writeText(message.content)
    window.message.success({ content: 'Copied!', key: 'copy-message' })
  }

  const onDelete = async () => {
    const confirmed = await window.modal.confirm({
      icon: null,
      title: 'Delete Message',
      content: 'Are you sure you want to delete this message?',
      okText: 'Delete',
      okType: 'danger'
    })

    confirmed && onDeleteMessage?.(message)
  }

  const onEdit = () => {
    EventEmitter.emit(EVENT_NAMES.EDIT_MESSAGE, message)
  }

  return (
    <MessageContainer key={message.id}>
      <AvatarWrapper>
        {message.role === 'assistant' ? (
          <Avatar src={message.modelId ? getModelLogo(message.modelId) : Logo} />
        ) : (
          <Avatar src={avatar} />
        )}
      </AvatarWrapper>
      <MessageContent className="markdown">
        {message.status === 'sending' ? (
          <MessageContentLoading>
            <SyncOutlined spin size={24} />
          </MessageContentLoading>
        ) : (
          <Markdown children={message.content} components={{ code: CodeBlock as any }} />
        )}
        {showMenu && (
          <MenusBar className="menubar">
            {message.role === 'user' && (
              <Tooltip title="Edit" mouseEnterDelay={1}>
                <EditOutlined onClick={onEdit} />
              </Tooltip>
            )}
            <Tooltip title="Copy" mouseEnterDelay={1}>
              <CopyOutlined onClick={onCopy} />
            </Tooltip>
            <Tooltip title="Delete" mouseEnterDelay={1}>
              <DeleteOutlined onClick={onDelete} />
            </Tooltip>
            <ModelName>{message.modelId}</ModelName>
          </MenusBar>
        )}
      </MessageContent>
    </MessageContainer>
  )
}

const MessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  position: relative;
`

const AvatarWrapper = styled.div`
  margin-right: 10px;
`

const MessageContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  .menubar {
    opacity: 0;
  }
  &:hover {
    .menubar {
      opacity: 1;
    }
  }
`

const MessageContentLoading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
`

const MenusBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 6px;
  .anticon {
    cursor: pointer;
    margin-right: 8px;
    font-size: 15px;
    color: var(--color-icon);
    &:hover {
      color: var(--color-text-1);
    }
  }
`

const ModelName = styled.div`
  font-size: 12px;
  color: var(--color-text-2);
`

export default MessageItem
