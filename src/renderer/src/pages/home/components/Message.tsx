import Logo from '@renderer/assets/images/logo.png'
import useAvatar from '@renderer/hooks/useAvatar'
import { Message } from '@renderer/types'
import { Avatar } from 'antd'
import hljs from 'highlight.js'
import { marked } from 'marked'
import { FC, useEffect } from 'react'
import styled from 'styled-components'

const MessageItem: FC<{ message: Message }> = ({ message }) => {
  const { avatar } = useAvatar()

  useEffect(() => {
    hljs.highlightAll()
  })

  return (
    <MessageContainer key={message.id}>
      <AvatarWrapper>{message.role === 'assistant' ? <Avatar src={Logo} /> : <Avatar src={avatar} />}</AvatarWrapper>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(message.content) }} />
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

export default MessageItem
