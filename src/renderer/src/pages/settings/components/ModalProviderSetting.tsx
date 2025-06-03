import ModalListPopup from '@renderer/components/Popups/ModalListPopup'
import { useProvider } from '@renderer/hooks/useProvider'
import { Provider } from '@renderer/types'
import { Button, Card, Divider, Input } from 'antd'
import { groupBy } from 'lodash'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  provider: Provider
}

const ModalProviderSetting: FC<Props> = ({ provider }) => {
  const [apiKey, setApiKey] = useState(provider.apiKey)
  const [apiHost, setApiHost] = useState(provider.apiHost)
  const [apiPath, setApiPath] = useState(provider.apiPath)
  const { models, updateProvider } = useProvider(provider.id)

  const modelGroups = groupBy(models, 'group')

  useEffect(() => {
    setApiKey(provider.apiKey)
    setApiHost(provider.apiHost)
    setApiPath(provider.apiPath)
  }, [provider])

  const onUpdateApiKey = () => {
    updateProvider({ ...provider, apiKey })
  }

  const onUpdateApiHost = () => {
    updateProvider({ ...provider, apiHost })
  }

  const onUpdateApiPath = () => {
    updateProvider({ ...provider, apiHost })
  }

  const onAddModal = () => {
    ModalListPopup.show({ provider })
  }

  return (
    <Container>
      <Title>{provider.name}</Title>
      <Divider style={{ width: '100%', margin: '10px 0' }} />
      <SubTitle>API Key</SubTitle>
      <Input value={apiKey} placeholder="API Key" onChange={(e) => setApiKey(e.target.value)} onBlur={onUpdateApiKey} />
      <SubTitle>API Host</SubTitle>
      <Input
        value={apiHost}
        placeholder="API Host"
        onChange={(e) => setApiHost(e.target.value)}
        onBlur={onUpdateApiHost}
      />
      <SubTitle>API Path</SubTitle>
      <Input
        value={apiPath}
        placeholder="API Path"
        onChange={(e) => setApiPath(e.target.value)}
        onBlur={onUpdateApiPath}
      />
      <SubTitle>Models</SubTitle>
      {Object.keys(modelGroups).map((group) => (
        <Card key={group} type="inner" title={group} style={{ marginBottom: '10px' }} size="small">
          {modelGroups[group].map((model) => (
            <ModelListItem key={model.id}>{model.id}</ModelListItem>
          ))}
        </Card>
      ))}
      <Button type="primary" style={{ width: '100px', marginTop: '10px' }} onClick={onAddModal}>
        Edit Models
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - var(--navbar-height));
  padding: 15px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const SubTitle = styled.div`
  font-size: 12px;
  color: var(--color-text-3);
  margin: 10px 0;
`

const ModelListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`

export default ModalProviderSetting
