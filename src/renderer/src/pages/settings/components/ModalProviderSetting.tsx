import ModalListPopup from '@renderer/components/Popups/ModalListPopup'
import { useProvider } from '@renderer/hooks/useProvider'
import { getModelLogo } from '@renderer/services/provider'
import { Provider } from '@renderer/types'
import { Avatar, Button, Card, Divider, Input } from 'antd'
import { groupBy } from 'lodash'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

import { SettingContainer, SettingSubtitle, SettingTitle } from './SettingComponent'

interface Props {
  provider: Provider
}

const ModalProviderSetting: FC<Props> = ({ provider }) => {
  const [apiKey, setApiKey] = useState(provider.apiKey)
  const [apiHost, setApiHost] = useState(provider.apiHost)
  const { models, updateProvider } = useProvider(provider.id)

  const modelGroups = groupBy(models, 'group')

  useEffect(() => {
    setApiKey(provider.apiKey)
    setApiHost(provider.apiHost)
  }, [provider])

  const onUpdateApiKey = () => {
    updateProvider({ ...provider, apiKey })
  }

  const onUpdateApiHost = () => {
    updateProvider({ ...provider, apiHost })
  }

  const onAddModal = () => {
    ModalListPopup.show({ provider })
  }

  return (
    <SettingContainer>
      <SettingTitle>{provider.name}</SettingTitle>
      <Divider style={{ width: '100%', margin: '10px 0' }} />
      <SettingSubtitle>API Key</SettingSubtitle>
      <Input
        value={apiKey}
        placeholder="API Key"
        onChange={(e) => setApiKey(e.target.value)}
        onBlur={onUpdateApiKey}
        spellCheck={false}
      />
      <SettingSubtitle>API Host</SettingSubtitle>
      <Input
        value={apiHost}
        placeholder="API Host"
        onChange={(e) => setApiHost(e.target.value)}
        onBlur={onUpdateApiHost}
      />
      <SettingSubtitle>Models</SettingSubtitle>
      {Object.keys(modelGroups).map((group) => (
        <Card key={group} type="inner" title={group} style={{ marginBottom: '10px' }} size="small">
          {modelGroups[group].map((model) => (
            <ModelListItem key={model.id}>
              <Avatar src={getModelLogo(model.id)} size={22} style={{ marginRight: '8px' }} />
              {model.id}
            </ModelListItem>
          ))}
        </Card>
      ))}
      <Button type="primary" style={{ width: '100px', marginTop: '10px' }} onClick={onAddModal}>
        Edit Models
      </Button>
    </SettingContainer>
  )
}

const ModelListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 0;
`

export default ModalProviderSetting
