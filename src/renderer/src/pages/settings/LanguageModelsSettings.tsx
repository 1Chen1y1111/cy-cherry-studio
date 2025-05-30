import { Collapse, CollapseProps } from 'antd'
import { FC } from 'react'
import styled from 'styled-components'

const LanguageModelsSettings: FC = () => {
  const items: CollapseProps['items'] = [
    {
      key: 'openai',
      label: 'OpenAI',
      children: <p>OpenAI</p>
    },
    {
      key: 'silicon',
      label: 'Silicon',
      children: <p>Silicon</p>
    },
    {
      key: 'deepSeek',
      label: 'deepSeek',
      children: <p>deepSeek</p>
    },
    {
      key: 'grok',
      label: 'Grok',
      children: <p>Grok</p>
    }
  ]

  return (
    <Container>
      <Collapse items={items} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
`

export default LanguageModelsSettings
