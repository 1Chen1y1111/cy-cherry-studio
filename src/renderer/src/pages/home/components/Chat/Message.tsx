import Logo from '@renderer/assets/images/logo.png'
import { Message } from '@renderer/types'
import { Avatar } from 'antd'
import hljs from 'highlight.js'
import { marked } from 'marked'
import { FC, useEffect } from 'react'
import styled from 'styled-components'

const MessageItem: FC<{ message: Message }> = ({ message }) => {
  useEffect(() => {
    hljs.highlightAll()
  })

  return (
    <MessageContainer key={message.id}>
      <AvatarWrapper>
        {message.role === 'agent' ? <Avatar src={Logo} /> : <Avatar alt="Justin Chen">Y</Avatar>}
      </AvatarWrapper>
      <div className="markdown" dangerouslySetInnerHTML={{ __html: marked(message.content) }}></div>
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
