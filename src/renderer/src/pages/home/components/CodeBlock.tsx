import { CopyOutlined } from '@ant-design/icons'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styled from 'styled-components'

interface CodeBlockProps {
  children: string
  className?: string
  [key: string]: any
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, ...rest }) => {
  const match = /language-(\w+)/.exec(className || '')

  const onCopy = () => {
    navigator.clipboard.writeText(children)
    window.message.success({ content: 'Copied!', key: 'copy-code' })
  }

  return match ? (
    <div>
      <CodeHeader>
        <CodeLanguage>{'<' + match[1].toUpperCase() + '>'}</CodeLanguage>
        <CopyOutlined className="copy" onClick={onCopy} />
      </CodeHeader>
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        customStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: 0 }}
        style={atomDark}
        wrapLongLines={true}
      />
    </div>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  )
}

const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  background-color: #323232;
  height: 40px;
  padding: 0 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .copy {
    cursor: pointer;
    color: var(--color-text-3);
    transition: color 0.3s;
  }
  .copy:hover {
    color: var(--color-text-1);
  }
`

const CodeLanguage = styled.div`
  font-weight: bold;
`

export default CodeBlock
